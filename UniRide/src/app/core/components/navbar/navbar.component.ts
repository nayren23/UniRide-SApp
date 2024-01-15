import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from "@angular/router"
import { tap } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sidebarVisible: boolean = false;
  items?: MenuItem[];
  userItems?: MenuItem[];
  isLoggedIn: boolean = false;
  userRole?: number;


  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedInStatus: any) => {
      this.isLoggedIn = loggedInStatus;
      this.updateMenuItems();
    });

    this.updateMenuItems();
  }

  updateMenuItems(): void {

    if (sessionStorage.getItem("user_r"))
      this.userRole = Number(sessionStorage.getItem("user_r"))
    else
      this.userRole = -1

    if (this.isLoggedIn) {
      this.items = []

      if (this.userRole == 1 || this.userRole == 2) {
        this.items.push({
          label: 'Rechercher un trajet',
          icon: 'pi pi-fw pi-search',
          command: () => {
            this.navigate("/trips/search");
          }
        })
      }

      if (this.userRole == 1) {
        this.items.push({
          label: 'Proposer un trajet',
          icon: 'pi pi-fw pi-plus-circle',
          command: () => {
            this.navigate("/trips/create");
          }
        }, {
          label: 'Trajets Proposés',
          icon: 'pi pi-fw pi-list',
          command: () => {
            this.navigate("/trips/proposed");
          }
        })
      }

      if (this.userRole == 1 || this.userRole == 2) {
        this.items.push({
          label: 'Trajets Passager',
          icon: 'pi pi-fw pi-list',
          command: () => {
            this.navigate("/trips/passenger");
          }
        })
      }

      if (this.userRole == 0) {
        this.items.push({
          label: 'Admin',
          command: () => {
            this.navigate("admin/documents");
          }
        })
      }

      this.userItems = [
        {
          label: 'Mon Profil',
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.navigate("/profil-information");
          }
        },
        {
          label: 'Déconnexion',
          icon: 'pi pi-fw pi-times',
          command: () => {
            this.logout();
          }
        }
      ]
    }
    else {
      this.items = [
        {
          label: 'Connexion',
          icon: 'pi pi-fw pi-check',
          command: () => {
            this.navigate("/login");
          }
        },
        {
          label: 'Inscription',
          icon: 'pi pi-fw pi-align-justify',
          command: () => {
            this.navigate("/registration");
          }
        }
      ];
    }
  }



  logout(): void {
    this.authService.logout().pipe(
      tap(() => {
        this.sidebarVisible = false;
        this.navigate("/login");
        this.updateMenuItems();
      })).subscribe();
  }

  navigate(path: string): void {
    this.router.navigate([path])
  }
}
