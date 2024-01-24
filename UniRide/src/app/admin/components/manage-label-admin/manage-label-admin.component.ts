import { Component, OnInit } from '@angular/core'
import { Label } from 'src/app/core/models/label.model'
import { ToastrService } from 'ngx-toastr'
import { ConfirmationService, MessageService } from 'primeng/api'
import { LabelServiceMock } from 'src/app/core/services/label/label-management.service.mock'
import { LabelService } from 'src/app/core/services/label/label-management.service'

@Component({
  selector: 'app-manage-label-admin',
  templateUrl: './manage-label-admin.component.html',
  styleUrls: ['./manage-label-admin.component.css']
})

export class ManageLabelAdminComponent implements OnInit {
  labelDialog: boolean = false
  labels: Label[] = []
  label!: Label
  selectedLabels!: Label[] | null

  submitted: boolean = false
  statuses!: any[]


  constructor(
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private labelService: LabelService,
    private labelServiceMock: LabelServiceMock,
  ) { }

  ngOnInit() {
    this.getLabels()

    this.statuses = [
      { label: 'PASSAGER', value: 2 },
      { label: 'CONDUCTEUR', value: 1 },
      { label: 'NON_ATTRIBUE', value: null }
    ]
  }

  /**
   * Call the API to get the labels
   */
  getLabels() {
    this.labels = []
    this.labelService.getLabels().subscribe({
      next: (data: any) => {
        data.labels.forEach((test: any) => {
          const label: Label = {
            id_criteria: test.label.id_criteria,
            name: test.label.name,
            description: test.label.description,
            role: test.label.role
          }
          this.labels.push(label)
        })
        this.labels = [...this.labels]
      },
      error: (error: any) => {
        this.toastr.error('La récupération des labels a échoué. Veuillez réessayer ultérieurement.', 'Erreur')
        console.log('error:', error)
      },
    })
  }

  /**
   * Open the dialog to create a new label
   */
  openNew() {
    const label: Label = { id_criteria: 0, name: '', description: '', role: 1 }
    this.label = label
    this.submitted = false
    this.labelDialog = true
  }

  /**
   * Delete the selected labels
   */
  deleteSelectedLabels() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les labels sélectionnés ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.labels = this.labels.filter((val) => !this.selectedLabels?.includes(val))
        this.selectedLabels = null
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Labels Supprimer', life: 3000 })
      }
    })
  }

  /**
   * Hide the dialog, when the user click on the button cancel
   */
  hideDialog() {
    this.labelDialog = false
    this.submitted = false
  }

  /**
   * Save the label in the database, when the user click on the button new or update
   * @param label 
   */
  saveLabel(label: Label) {
    this.submitted = true
    if (this.label.name?.trim()) {
      if (this.label.id_criteria) {
        this.labelService.updateLabel(label).subscribe({
          next: (data: any) => {
            this.getLabels()
            this.toastr.success('Le label ' + label.name + ' a bien été modifié', 'Info')
          },
          error: (error: any) => {
            this.toastr.error('La modification du label a échoué. Veuillez réessayer ultérieurement.', 'Erreur')
            console.log('error:', error)
          }
        })
      }
      else {
        this.labelService.insertLabel(label).subscribe({
          next: (data: any) => {
            this.getLabels()
            this.toastr.success('Le label ' + label.name + ' a bien été crée', 'Info')
          },
          error: (error: any) => {
            this.toastr.error('La modification du label a échoué. Veuillez réessayer ultérieurement.', 'Erreur')
            console.log('error:', error)
          }
        })
      }
      this.labelDialog = false
    }
  }

  /**
   * Edit the label, when the user click on the button edit
   * @param label 
   */
  editLabel(label: Label) {
    this.label = { ...label }
    this.labelDialog = true
  }

  /**
   * Delete the label in the database, when the user click on the button delete
   * @param label 
   */
  deleteLabel(label: Label) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ' + label.name + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.labelService.deleteLabel(label.id_criteria).subscribe({
          next: (data: any) => {
            this.getLabels()
            this.toastr.success('Le label ' + label.name + ' a bien été supprimé', 'Info')
          },
          error: (error: any) => {
            this.toastr.error('La suppression du label a échoué. Veuillez réessayer ultérieurement.', 'Erreur')
            console.log('error:', error)
          }
        })
      }
    })
  }

  /**
   * This method is used to convert the role from a number to a string
   * @param role 
   * @returns 
   */
  getLabelSeverity(status: any) {
    return this.labelService.getSeverity(status)
  }

  /**
   * This method is used to convert the role from a number to a string
   * @param role 
   * @returns 
   */
  convertRoleLabel(role: any) {
    return this.labelService.convertRoleIntoString(role)
  }
}
