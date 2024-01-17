import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../core/models/user.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-user-info-summary',
  templateUrl: './user-info-summary.component.html',
  styleUrls: ['./user-info-summary.component.css'],
  providers: [DialogService]
})
export class UserInfoSummaryComponent implements OnInit {

  user!: User;
  @Input() userid!: number;
  ref: DynamicDialogRef | undefined; 

  constructor(
    public dialogService: DialogService,
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

  showDialog() {
    this.ref = this.dialogService.open(UserInfoComponent, {
      style: { width: '50vw' },
      data: {
        userid: this.user.id
      },
      header: "Details du profil"
    })
  }

  ngOnDestroy() { 
    if (this.ref) { 
        this.ref.close(); 
    } 
} 
}
