import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from "@angular/router"


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sidebarVisible: boolean = false;
  items?: MenuItem[];
  userItems?: MenuItem[];
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    if (this.isLoggedIn()) {
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.navigate("#");
        }
      },
      {
        label: 'Rechercher un trajet',
        icon: 'pi pi-fw pi-search',
        command: () => {
          this.navigate("/create-search");
        }
      },
      {
        label: 'Proposer un trajet',
        icon: 'pi pi-fw pi-plus-circle',
        command: () => {
          this.navigate("/create-trip");
        }
      },
      {
        label: 'Trajets Proposés',
        icon: 'pi pi-fw pi-list',
        command: () => {
          this.navigate("/trips-proposed");
        }
      },
      {
        label: 'Admin',
        command: () => {
          this.navigate("/document-verification-display");
        }
      }
    ];
    this.userItems = [
      {
        label: 'Mon Profil',
        icon: 'pi pi-fw pi-user',
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
          this.navigate("/logIn");
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
    this.authService.logout();
    this.sidebarVisible = false;
    this.navigate("/logIn");
  }


  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  navigate(path: string): void {
    this.router.navigate([path])
  }
}
