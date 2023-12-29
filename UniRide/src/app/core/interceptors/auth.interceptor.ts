import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../environements/environment.prod';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenCompleted: Subject<void> = new Subject<void>();

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes(environment.apiUrl)) {
            return next.handle(req);
        }
        const modifiedReq = this.addToken(req);
        return next.handle(modifiedReq).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401 && error.error.message === "TOKEN_HAS_EXPIRED") {
                if (this.authService.getKeepLoggedIn()) {
                    return this.handle401Error(req, next);
                } else {
                    this.router.navigate(['/logIn']);
                    return throwError(() => error);
                }
            } else {
                return throwError(() => error);
            }
        }));
    }

    private addToken(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${this.authService.getToken()}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            return this.authService.refreshToken().pipe(
                switchMap(() => {
                    this.isRefreshing = false;
                    this.refreshTokenCompleted.next();
                    return next.handle(this.addToken(request));
                }),
                catchError((error) => {
                    this.isRefreshing = false;
                    return throwError(() => error);
                })
            );
        } else {
            return this.refreshTokenCompleted.pipe(
                take(1),
                switchMap(() => next.handle(this.addToken(request)))
            );

        }
    }

}