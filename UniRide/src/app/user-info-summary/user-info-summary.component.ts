import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-info-summary',
  templateUrl: './user-info-summary.component.html',
  styleUrls: ['./user-info-summary.component.css']
})
export class UserInfoSummaryComponent implements OnInit {

  user!: User;
  @Input() userid!: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUserInfos();
  }

  getUserInfos(): void {
    this.userService.getUserInfoSummaryById(this.userid).subscribe({
      next: (data) => {
        this.user = {
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          description: data.description
        }
      },
      error: (err) => console.error(err)
    })
  }
}
