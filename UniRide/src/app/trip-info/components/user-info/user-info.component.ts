import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user!: User;
  constructor(
    private userService: UserService,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.getUserInfoDetails()
  }

  getUserInfoDetails() {
    console.log("test")
    this.userService.getUserInfoDetails(this.config.data.userid).subscribe({
      next: (data: any) => {
        this.user = {
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          gender: data.gender,
          description: data.description,
          phone_number: data.phone_number,
          profile_picture: data.profile_picture??""
        }
      },
      error: (error: any) => {

      }
    })
  }

  showDialog() {
    this.getUserInfoDetails()
  }

  getGender() {
    switch (this.user.gender) {
      case "H": return "Homme";
      case "F": return "Femme";
      default: return "Autre";
    }
  }

  getPhoneNumber() {
    return this.user.phone_number;
  }
}
