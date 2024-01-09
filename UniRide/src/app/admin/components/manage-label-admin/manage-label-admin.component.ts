import { Component, OnInit, ViewChild } from '@angular/core';
import { Label } from 'src/app/core/models/label.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-manage-label-admin',
  templateUrl: './manage-label-admin.component.html',
  styleUrls: ['./manage-label-admin.component.css']
})

export class ManageLabelAdminComponent implements OnInit {
  labelDialog: boolean = false;

  labels!: Label[];

  label!: Label;

  selectedLabels!: Label[] | null;

  submitted: boolean = false;

  statuses!: any[];


  constructor(
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {

  }

  openNew() {
    this.label = {};
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

  saveLabel() {
    this.submitted = true;

    if (this.label.name?.trim()) {
      if (this.label.id) {
        // this.labels[this.findIndexById(this.label.id)] = this.label;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Label Mise à jour', life: 3000 });
      } else {
        // this.label.id = this.createId();
        this.labels.push(this.label);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Label Créer', life: 3000 });
      }

      this.labels = [...this.labels];
      this.labelDialog = false;
      this.label = {};
    }
  }

  /*
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.labels.length; i++) {
      if (this.labels[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
*/

  editLabel(label: Label) {
    this.label = { ...label };
    this.labelDialog = true;
  }

  deleteLabel(label: Label) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + label.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.labels = this.labels.filter((val) => val.id !== label.id);
        this.label = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Label Supprimer', life: 3000 });
      }
    });
  }
}


