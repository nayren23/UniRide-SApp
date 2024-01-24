import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DocumentVerificationService } from '../../../core/services/document-verification/document-verification.service'
import { ConfirmationService } from 'primeng/api'
import { DocumentVerification } from '../../../core/models/document-verification'
import { CheckData } from '../../../core/models/check-data.model'
import { DataView } from 'primeng/dataview'
import { ToastrService } from 'ngx-toastr'
import { User } from 'src/app/core/models/user.model'
import { UserService } from '../../../core/services/user/user.service'

@Component({
  selector: 'app-manage-request-verification-document',
  templateUrl: './manage-request-verification-document.component.html',
  styleUrls: ['./manage-request-verification-document.component.css']
})

export class ManageRequestVerificationDocumentComponent implements OnInit {

  documents: DocumentVerification[] = [] // a changer avec un modele
  id_user: number = -1
  user: User = new User()

  @ViewChild('dv') dataView!: DataView
  length_reason_refusal: number = 5
  textareaValues: { [key: string]: string } = {}

  constructor(
    private route: ActivatedRoute,
    private documentVerificationService: DocumentVerificationService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id_user = params['id_user']
    })
    this.getInfosUserById(this.id_user)
    this.getDocumentsVerification()
  }

  /**
   * Call the API to get the user information
   * @param userId 
   */
  getInfosUserById(userId: number) {
    this.userService.getInfosUserById(userId).subscribe({
      next: (data: any) => {
        this.user = data.user_information
      },
      error: (error: any) => {
        console.log(error)
        this.toastr.error('La récupération des informations de l\'utilisateur a échoué. Veuillez réessayer ultérieurement.', 'Erreur')
      },
    })
  }

  /**
   * Call the API to get the document verification for the user
   */
  getDocumentsVerification() {
    this.documentVerificationService.getDocumentVerificationForUser(this.id_user).subscribe({
      next: (data: any) => {
        data.documents.forEach((documentGroup: any) => {
          documentGroup.document.forEach((document: any) => {
            const documentVerification = new DocumentVerification(document.url, document.status, document.type)
            this.documents.push(documentVerification)
            this.documents = [...this.documents]
          })
        })
      },
      error: (error: any) => {
        this.toastr.error('La récupération des documents a échoué. Veuillez réessayer ultérieurement.', 'Erreur')
        console.log('error:', error)
      },
    })
  }

  /**
   * This function is called when the user click on the button to accept or refuse the document
   * @param event 
   * @param message 
   * @param action the action is the string 'accepté' or 'refusé'
   * @param document 
   * @param status 
   */
  performAction(event: Event, message: string, action: number, document: DocumentVerification, status: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateDocument(document, action, status)
      },
      reject: () => {
        this.toastr.warning(`Vous n'avez pas ${action} le document`, 'Action annulée')
      }
    })
  }

  /**
   * Function to set the button disabled, if the textarea is empty, or if the length of the textarea is less than length_reason_refusal
   * @param documentType 
   * @returns 
   */
  isButtonDisabled(documentType: string): boolean {
    const value = this.textareaValues[documentType]

    if (!value) {
      return true
    }
    return value.trim() === '' || value.length < this.length_reason_refusal || value.length >= 255
  }

  /**
   * This function is called when the user click on the button to accept or refuse the document, this function update thestatus of document
   * @param document 
   * @param action  the action is the string 'accepté' or 'refusé'
   * @param status 
   */
  private updateDocument(document: DocumentVerification, action: number, status: string) {
    document.status = status
    const documentUpdated = new DocumentVerification(document.url, status, document.type)
    if (action === 0) {
      documentUpdated.description = this.textareaValues[document.type]
    }
    else {
      documentUpdated.description = ''
    }

    const checkData = new CheckData(this.id_user, documentUpdated)
    this.documentVerificationService.updateDocumentVerificationForUser(checkData).subscribe({
      next: (data: any) => {
        this.toastr.success(`Vous avez ${this.getNameOfAction(action)} le document`, 'Info')
      },
      error: (error: any) => {
        this.toastr.error(`Échec de l\'action. Veuillez réessayer ultérieurement.`, 'Erreur')
        console.log('error:', error)
      }
    })
  }

  /**
   * Return the name of the action
   * @param action 
   * @returns 
   */
  private getNameOfAction(action: number) {
    switch (action) {
      case 0:
        return 'accepté'

      case 1:
        return 'refusé'

      default:
        return 'Erreur'
    }
  }

  /**
   * Function to convert the status of the document
   * @param status 
   * @returns 
   */
  convertStatusDocuments(status: string) {
    return this.documentVerificationService.convertStatus(status)
  }

  /**
   * Return the severity of the document
   * @param document 
   * @returns 
   */
  getSeverityDocuments(status: string) {
    return this.documentVerificationService.getSeverity(status)
  }

  /**
   * Function to convert the type of the document
   * @param type 
   * @returns 
   */
  convertTypeDocument(type: string) {
    return this.documentVerificationService.convertType(type)
  }
}