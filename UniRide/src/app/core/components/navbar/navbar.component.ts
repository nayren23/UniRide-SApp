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
      let admin = (this.userRole == 0)
      let driver = (this.userRole == 1 || admin)
      let passengerOrDriver = (driver || this.userRole == 2)
      this.items.push({
        label: 'Rechercher un trajet',
        icon: 'pi pi-fw pi-search',
        command: () => {
          this.navigate("/trips/search");
        },
        visible: passengerOrDriver
      },
        {
          label: 'Trajets Passager',
          icon: 'pi pi-fw pi-list',
          command: () => {
            this.navigate("/trips/passenger");
          },
          visible: passengerOrDriver
        })

      this.items.push(
        {
          label: 'Proposer un trajet ponctuel',
          icon: 'pi pi-fw pi-plus-circle',
          command: () => {
            this.navigate("/trips/create");
          },
          visible: driver
        },
        {
          label: 'Proposer un trajet quotidien',
          icon: 'pi pi-fw pi-plus-circle',
          command: () => {
            this.navigate("/trips/create-daily");
          },
          visible: driver
        },
        {
          label: 'Trajets Proposés',
          icon: 'pi pi-fw pi-list',
          command: () => {
            this.navigate("/trips/proposed");
          },
          visible: driver
        }
      )

      this.userItems = [
        {
          label: 'Mon Profil',
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.navigate("/profil-information");
          }
        },
        {
          label: 'Classement',
          icon: 'pi pi-fw pi-star',
          command: () => {
            this.navigate("/ranking");
          }
        },
        {
          label: 'Admin',
          icon: 'pi pi-fw pi-file',
          command: () => {
            this.navigate("admin/documents");
          },
          visible: admin
        },
        {
          label: 'Liste des utilisateurs',
          icon: 'pi pi-fw pi-users',
          command: () => {
            this.navigate("admin/users");
          },
          visible: admin
        },
        {
          label: 'Critères de notations',
          icon: 'pi pi-fw pi-star-fill',
          command: () => {
            this.navigate("admin/labels");
          },
          visible: admin
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

  isDriver(): boolean {
    return (Number(sessionStorage.getItem("user_r")) == 1 || Number(sessionStorage.getItem("user_r"))==0)
  }

  navigate(path: string): void {
    this.sidebarVisible = false;
    this.router.navigate([path])
  }
}
