// trip-search-result.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-search-result',
  templateUrl: './trip-search-result.component.html',
  styleUrls: ['./trip-search-result.component.css']
})
export class TripSearchResultComponent implements OnInit {

  searchResults: any[] = [];

  constructor(private route: ActivatedRoute) {}

 // trip-search-result.component.ts

ngOnInit(): void {
  this.route.queryParams.subscribe((queryParams) => {
    const resultData = queryParams['trips'] ? JSON.parse(queryParams['trips']) : [];
    this.searchResults = resultData;
    console.log('Search results in result component:', this.searchResults);
  });
}

}
