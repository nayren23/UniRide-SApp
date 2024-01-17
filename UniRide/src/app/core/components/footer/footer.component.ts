import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  getAnneeActuelle(): number {
    const date = new Date();
    return date.getFullYear();
  }
}
