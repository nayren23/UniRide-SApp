import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/core/services/about/about.service';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.css']
})
export class ConditionsComponent implements OnInit {

  conditions!: any;

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.aboutService.getConditions().subscribe({
      next: (data: any) => {
        this.conditions = data.conditions;
      }
    });
  }

}
