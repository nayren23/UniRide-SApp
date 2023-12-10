import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentVerificationService } from '../Services/document-verification/document-verification.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentVerification } from '../models/document-verification';

@Component({
  selector: 'app-manage-request-verification-document',
  templateUrl: './manage-request-verification-document.component.html',
  styleUrls: ['./manage-request-verification-document.component.css']
})
export class ManageRequestVerificationDocumentComponent implements OnInit {

  documents: DocumentVerification[] = []; // a changer avec un modele
  id_user: number = -1;
  full_name: string = '';

  constructor(
    private route: ActivatedRoute,
    private documentVerificationService: DocumentVerificationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id_user = params['id_user'];
      this.full_name = params['full_name'];
    });

    this.documents = [
      {
        user_full_name: "Emilie Launois",
        url: "https://lecap.consulfrance.org/IMG/arton465.png?1641476764",
        status: 0,
        type: "card",
      },
      {
        user_full_name: "Emilie Launois",
        url: "https://www.fichier-pdf.fr/2016/09/14/certificat-de-scolarite-3md5z1-2016-2017-launois-emilie-1/preview-certificat-de-scolarite-3md5z1-2016-2017-launois-emilie-1-1.jpg",
        status: -1,
        type: "school_certificate",
      },
      {
        user_full_name: "Emilie Launois",
        url: "https://mobile.interieur.gouv.fr/var/miomcti/storage/images/www.interieur.gouv.fr/version-fre/actualites/l-actu-du-ministere/nouveau-permis-de-conduire-securise-le-16-septembre-2013/466172-1-fre-FR/Nouveau-permis-de-conduire-securise-le-16-septembre-2013_catcher.jpg",
        status: 1,
        type: "license",
      },
    ]

    /**
     * Call the API to get the document verification for the user
     */
    this.documentVerificationService.getDocumentVerificationForUser().subscribe({
      next: (data: any) => {
        data.documents.forEach((document: any) => {
          this.documents.push({
            user_full_name: this.full_name,
            url: document.url,
            status: document.status,
            type: document.type,
          });
        })
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur 📄❌🔄', detail: 'La récupération des documents a échoué . Veuillez réessayer ultérieurement.' });
        console.log('error:', error);
      },
    })
  }

  performAction(event: Event, message: string, action: string, document: DocumentVerification, status: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateDocument(document, status, action);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Refus 📄🚫', detail: `Vous n'avez pas ${action} le document` });
      }
    });
  }

  private updateDocument(document: DocumentVerification, status: number, action: string) {
    const checkData = {
      user_id: this.id_user,
      //document: {
      document_type: document.type,
      status: status,
      //}
    };

    console.log('checkData:', checkData);
    this.documentVerificationService.updateDocumentVerificationForUser(checkData).subscribe({
      next: (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Info ✅📄👍', detail: `Vous avez ${action} le document` });
        console.log('data:', data);
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur ❌🔄🚫', detail: 'Échec de l\'action. Veuillez réessayer ultérieurement.' });
        console.log('error:', error);
      },
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
  getSeverity(document: any) {
    switch (document.status) {
      case 1:
        return 'success';

      case 0:
        return 'warning';

      case -1:
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
  convertirStatus(status: number) {
    switch (status) {
      case 1:
        return 'Validé';

      case 0:
        return 'En attente';

      case -1:
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