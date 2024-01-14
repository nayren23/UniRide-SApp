import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-pdf',
  templateUrl: './display-pdf.component.html',
  styleUrls: ['./display-pdf.component.css']
})
export class DisplayPdfComponent implements OnInit {
  @Input() document!: any;

  display: boolean = false;
  zoom: number = 0.1;

  constructor() { }

  ngOnInit(): void {
  }

  displayPDF() {
    this.display = !this.display;
  }

  zoomIn(): void {
    this.zoom += 0.1;
    console.log(this.zoom);
  }

  zoomOut(): void {
    if (this.zoom > 0.1) this.zoom -= 0.1;
    console.log(this.zoom);
  }

  render(): void {
    this.zoom += 0.9;
  }
}
