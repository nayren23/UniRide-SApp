import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Label } from 'src/app/core/models/label.model';
import { LabelService } from 'src/app/core/services/label/label-management.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  value!: number;
  labels: Label[]= [];
  ratingForm!: FormGroup;
  visible: boolean = false
  dataSend: boolean = false

  constructor(private route: ActivatedRoute,
    private labelService: LabelService,
    private formBuilder: FormBuilder,
    private router: Router,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.visible = false
    this.ratingForm = this.formBuilder.group({
      labels: this.formBuilder.array([])
    });
    this.getLabels()
  }

  showDialog() {
    this.ngOnInit()
  }

  get labelsFormArray(): FormArray {
    return this.ratingForm.get('labels') as FormArray;
  }

  private addLabelFormGroup(label_id: number): void {
    const labelFormGroup = this.formBuilder.group({
      id_criteria: [label_id, Validators.required],
      rating: [null, Validators.required]
    });
    this.labelsFormArray.push(labelFormGroup);
  }

  getLabels(): void {
    this.labelService.getLabelsToRate(this.config.data.tripid).subscribe({
      next: (data: any) => {
        console.log(data)
        data.label.forEach((label: any) => {
          console.log(data);
          this.labels.push({
            id_criteria: label.id,
            name: label.name
          });
          this.addLabelFormGroup(label.id);
          console.log(this.labels);
        });
      }
    });
  }

  submitRatings(): void {
    const formGroups = (this.ratingForm.get('labels') as FormArray).controls;
  
    formGroups.forEach((control: AbstractControl, index) => {
      const group = control as FormGroup
      console.log(`Envoi des données pour le label index ${index}:`, group.value);
      this.sendRatingToBackend(group.value).subscribe(
        {next: (data: any) => {
        console.log(`Réponse pour le label index ${index}:`, data);
        this.dataSend = true
        data = {
          "dataSend": this.dataSend
        }
        this.ref.close(data);

        this.toastr.success("Merci de votre participation !", "Avis envoyé")

      }, error: (error: any) => {
        this.toastr.error("Erreur lors de l'envoi des avis", "Erreur")
      }});
    });
  }
  
  sendRatingToBackend(ratingData: any) {
    return this.labelService.submitRating(this.config.data.tripid, ratingData.rating, ratingData.id_criteria);
  }
}
