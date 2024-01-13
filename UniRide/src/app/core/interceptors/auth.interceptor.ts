import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../../environements/environement';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenCompleted: Subject<void> = new Subject<void>();

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes(environment.backUrl)) {
            return next.handle(req);
        }
        req = req.clone({
            withCredentials: true
        });
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401 && error.error.message === "TOKEN_HAS_EXPIRED") {
                if (req.url.includes('refresh')) {
                    this.authService.logout().subscribe()
                    return throwError(() => error);
                }
                if (this.authService.getKeepLoggedIn()) {
                    return this.handle401Error(req, next);
                } else {
                    this.authService.logout().subscribe()
                    return throwError(() => error);
                }
            } else {
                return throwError(() => error);
            }
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            return this.authService.refreshToken().pipe(
                switchMap(() => {
                    this.isRefreshing = false;
                    this.refreshTokenCompleted.next();
                    return next.handle(request);
                }),
                catchError((error) => {
                    this.isRefreshing = false;
                    return throwError(() => error);
                })
            );
        } else {
            return this.refreshTokenCompleted.pipe(
                take(1),
                switchMap(() => next.handle(request))
            );

        }
    }

}