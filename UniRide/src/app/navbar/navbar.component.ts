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
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
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
        label: 'Déconnexion',
        icon: 'pi pi-fw pi-times',
        command: () => {
          this.logout();
        }
      },
    ];
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
