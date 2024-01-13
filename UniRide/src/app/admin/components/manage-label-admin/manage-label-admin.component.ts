import { Component, OnInit, ViewChild } from '@angular/core';
import { Label } from 'src/app/core/models/label.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LabelServiceMock } from 'src/app/core/services/label/label-management.service.mock';
import { LabelService } from 'src/app/core/services/label/label-management.service';

@Component({
  selector: 'app-manage-label-admin',
  templateUrl: './manage-label-admin.component.html',
  styleUrls: ['./manage-label-admin.component.css']
})

export class ManageLabelAdminComponent implements OnInit {
  labelDialog: boolean = false;

  labels: Label[] = [];

  label!: Label;

  selectedLabels!: Label[] | null;

  submitted: boolean = false;

  statuses!: any[];


  constructor(
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private labelServiceMock: LabelServiceMock,
    private labelService: LabelService,
  ) { }

  ngOnInit() {
    this.getLabels();

    this.statuses = [
      { label: 'PASSAGER', value: 2 },
      { label: 'CONDUCTEUR', value: 1 },
      { label: 'NON_ATTRIBUE', value: null }
    ];
  }

  getLabels() {
    this.labels = [];
    this.labelService.getLabels().subscribe({
      next: (data: any) => {
        data.labels.forEach((test: any) => {
          const label: Label = {
            id_criteria: test.label.id_criteria,
            name: test.label.name,
            description: test.label.description,
            role: test.label.role

          }
          this.labels.push(label);
        });
      },
      error: (error: any) => {
        this.toastr.error('La récupération des labels a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
        console.log('error:', error);
      },
      complete: () => {
        this.labels = [...this.labels];
      }
    });
    console.log('this.labels:', this.labels);
  }

  openNew() {
    this.label = { id_criteria: 0, name: '', description: '', role: 1 }
    this.submitted = false;
    this.labelDialog = true;
  }

  deleteSelectedLabels() {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer les labels selectionnés ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.labels = this.labels.filter((val) => !this.selectedLabels?.includes(val));
        this.selectedLabels = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Labels Supprimer', life: 3000 });
      }
    });
  }


  hideDialog() {
    this.labelDialog = false;
    this.submitted = false;
  }

  /**
   * Save the label in the database
   * @param label 
   */
  saveLabel(label: Label) {
    this.submitted = true;
    if (this.label.name?.trim()) {
      if (this.label.id_criteria) {
        this.labelService.updateLabel(label).subscribe({
          next: (data: any) => {
            this.getLabels();
            this.toastr.success('Le label ' + label.name + ' a bien été modifié', 'Info ✅📄👍');
          },
          error: (error: any) => {
            this.toastr.error('La modification du label a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
            console.log('error:', error);
          }
        });
      }
      else {
        this.labelService.insertLabel(label).subscribe({
          next: (data: any) => {
            this.getLabels();
            this.toastr.success('Le label ' + label.name + ' a bien été crée', 'Info ✅📄👍');
          },
          error: (error: any) => {
            this.toastr.error('La modification du label a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
            console.log('error:', error);
          }
        });
      }

      this.labels = [...this.labels];
      this.labelDialog = false;
    }
  }

  editLabel(label: Label) {
    this.label = { ...label };
    this.labelDialog = true;
  }

  deleteLabel(label: Label) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ' + label.name + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.labelService.deleteLabel(label.id_criteria).subscribe({
          next: (data: any) => {
            this.getLabels();
            this.toastr.success('Le label ' + label.name + ' a bien été supprimé', 'Info ✅📄👍');
          },
          error: (error: any) => {
            this.toastr.error('La suppression du label a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
            console.log('error:', error);
          }
        });
      }
    });
  }

  /**
   * Return the severity of the status
   * @param status 
   * @returns 
   */
  getSeverity(status: any) {
    switch (status) {
      case 'PASSAGER':
        return 'success';

      case 'CONDUCTEUR':
        return 'warning';

      case "NON_ATTRIBUE":
        return 'danger';

      default:
        return 'erreur';
    }
  }

  /**
   * Convert the role into a string
   * @param role 
   * @returns 
   */
  convertRoleIntoString(role: any) {
    switch (role) {
      case 1:
        return "CONDUCTEUR";

      case 2:
        return "PASSAGER";

      case null:
        return "NON_ATTRIBUE";

      default:
        return "ERREUR";
    }
  }
}


