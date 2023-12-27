import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <li>
    <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" (click)="logout()">Deconnexion</a>
  </li>
`,
})
export class AppComponent implements OnInit {
  title = 'UniRide';


  constructor(private authService: AuthService) {

  }


  ngOnInit(): void {
    initFlowbite();


  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

}
