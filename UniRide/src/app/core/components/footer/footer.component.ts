import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  /**
   * The current year
   * @returns the current year
   */
  getCurrentYear(): number {
    const date = new Date();
    return date.getFullYear();
  }
}
