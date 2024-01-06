import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resend-mail',
  templateUrl: './resend-mail.component.html',
  styleUrls: ['./resend-mail.component.css']
})
export class ResendMailComponent {
  constructor(private http: HttpClient) { }

  onSubmit() { }
}


