import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentVerificationService } from '../Services/document-verification/document-verification.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentVerification } from '../models/document-verification';
import { CheckData } from '../models/checkData';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-manage-request-verification-document',
  templateUrl: './manage-request-verification-document.component.html',
  styleUrls: ['./manage-request-verification-document.component.css']
})
export class ManageRequestVerificationDocumentComponent implements OnInit {

  documents: DocumentVerification[] = []; // a changer avec un modele
  id_user: number = -1;
  full_name: string = '';
  @ViewChild('dv') dataView!: DataView;

  constructor(
    private route: ActivatedRoute,
    private documentVerificationService: DocumentVerificationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id_user = params['id_user'];
      this.full_name = params['full_name'];
    });

    /**
     * Call the API to get the document verification for the user
     */
    this.documentVerificationService.getDocumentVerificationForUser(this.id_user).subscribe({
      next: (data: any) => {
        data.request.documents.forEach((documentGroup: any) => {
          documentGroup.document.forEach((document: any) => {
            const documentVerification = new DocumentVerification(this.full_name, document.url, document.status, document.type);
            this.documents.push(documentVerification);
          });
        });
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur 📄❌🔄', detail: 'La récupération des documents a échoué. Veuillez réessayer ultérieurement.' });
        console.log('error:', error);
      },
      complete: () => {
        this.dataView.changeLayout('list'); //We need to call this method to refresh the table, cause the table is not refreshed automatically, when we call the API
      }
    });

  }

  performAction(event: Event, message: string, action: string, document: DocumentVerification, status: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateDocument(document, action, status);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Action annulée 📄🚫', detail: `Vous n'avez pas ${action} le document` });
      }
    });
  }

  private updateDocument(document: DocumentVerification, action: string, status: string) {
    document.status = status;
    const documentUpdated = new DocumentVerification(document.user_full_name, document.url, status, document.type);
    const checkData = new CheckData(this.id_user, documentUpdated);
    this.documentVerificationService.updateDocumentVerificationForUser(checkData).subscribe({
      next: (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Info ✅📄👍', detail: `Vous avez ${action} le document` });
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur ❌🔄🚫', detail: 'Échec de l\'action. Veuillez réessayer ultérieurement.' });
        console.log('error:', error);
      }
    });
  }

  /**
   * Open the image in a new tab, in order to download it
   * @param document 
   */
  downloadImage(document: any) {
    window.open(document.url, '_blank');
  }

  /**
 * Return the severity of the document
 * @param document 
 * @returns 
 */
  getSeverity(status: string) {
    switch (status) {
      case "1":
        return 'success';

      case "0":
        return 'warning';

      case "-1":
        return 'danger';

      default:
        return 'danger';
    }
  };

  /**
   * Function to convert the status of the document
   * @param status 
   * @returns 
   */
  convertirStatus(status: string) {
    switch (status) {
      case "1":
        return 'Validé';

      case "0":
        return 'En attente';

      case "-1":
        return 'Refusé';

      default:
        return 'Erreur';
    }
  }

  /**
   * Function to convert the type of the document
   * @param type 
   * @returns 
   */
  convertType(type: string) {
    switch (type) {
      case 'license':
        return 'Permis de conduire';

      case 'card':
        return 'Carte d\'identité';

      case 'school_certificate':
        return 'Certificat de scolarité';

      default:
        return 'Document inconnu';
    }
  }
}