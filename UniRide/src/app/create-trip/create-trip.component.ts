import { Component, OnInit } from '@angular/core';
import { TripService } from '../Services/Trip/Trip.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit{
  createTripForm: FormGroup = new FormGroup({});


    constructor(
      private formBuilder: FormBuilder,
      private tripService: TripService
      ) {}

  ngOnInit(): void {
    this.createTripForm = this.formBuilder.group({
      adresseDepart: ['', Validators.required],
      adresseArrivee: ['', Validators.required],
      date: ['', Validators.required],
      horaire: ['', Validators.required],
      nombrePassagers: ['', [Validators.required, Validators.max(4)]]
    });
  }

  onSubmit() {
    if (this.createTripForm.valid) {
      // Handle form submission
      console.log('Form submitted successfully', this.createTripForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
