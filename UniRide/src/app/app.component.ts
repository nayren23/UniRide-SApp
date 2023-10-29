import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'UniRide';


  constructor() { }

  ngOnInit(): void {
    const profileImage = document.getElementById("profile-image");
    const linkList = document.getElementById("link-list");

    if (profileImage && linkList) {
        profileImage.addEventListener("click", function() {
            if (linkList.style.display === "none" || linkList.style.display === "") {
                linkList.style.display = "block";
            } else {
                linkList.style.display = "none";
            }
        });
    }
}

}
