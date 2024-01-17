import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/core/services/about/about.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  privacy!: any;

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.aboutService.getPrivacy().subscribe({
      next: (data: any) => {
        this.privacy = data.privacy;
      }
    });
  }
}
