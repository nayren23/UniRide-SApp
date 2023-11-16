// trip-search-result.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trip-search-result',
  templateUrl: './trip-search-result.component.html',
  styleUrls: ['./trip-search-result.component.css']
})
export class TripSearchResultComponent {
  @Input() searchResults: any[] = [];
}
