import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentVerificationService } from '../Services/document-verification/document-verification.service';
import { ConfirmationService } from 'primeng/api';
import { DocumentVerification } from '../models/document-verification';
import { CheckData } from '../models/checkData';
import { DataView } from 'primeng/dataview';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
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
        data.documents.forEach((documentGroup: any) => {
          documentGroup.document.forEach((document: any) => {
            const documentVerification = new DocumentVerification(this.full_name, document.url, document.status, document.type);
            this.setImages(documentVerification)
            this.documents.push(documentVerification);
          });
        });
      },
      error: (error: any) => {
        this.toastr.error('La récupération des documents a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
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
        this.toastr.warning(`Vous n'avez pas ${action} le document`, 'Action annulée 📄🚫');
      }
    });
  }

  private updateDocument(document: DocumentVerification, action: string, status: string) {
    document.status = status;
    const documentUpdated = new DocumentVerification(document.user_full_name, document.url, status, document.type);
    const checkData = new CheckData(this.id_user, documentUpdated);
    this.documentVerificationService.updateDocumentVerificationForUser(checkData).subscribe({
      next: (data: any) => {
        this.toastr.success(`Vous avez ${action} le document`, 'Info ✅📄👍');
      },
      error: (error: any) => {
        this.toastr.error(`Échec de l\'action. Veuillez réessayer ultérieurement.`, 'Erreur ❌🔄🚫');
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

  setImages(documentVerification: DocumentVerification) {
    if (documentVerification.type === 'license') {
      documentVerification.url = 'https://mobile.interieur.gouv.fr/var/miomcti/storage/images/www.interieur.gouv.fr/version-fre/actualites/l-actu-du-ministere/nouveau-permis-de-conduire-securise-le-16-septembre-2013/466172-1-fre-FR/Nouveau-permis-de-conduire-securise-le-16-septembre-2013_catcher.jpg';
    }
    else if (documentVerification.type === 'card') {
      documentVerification.url = 'https://lecap.consulfrance.org/IMG/arton465.png?1641476764';
    }
    else if (documentVerification.type === 'school_certificate') {
      documentVerification.url = 'https://www.fichier-pdf.fr/2016/09/14/certificat-de-scolarite-3md5z1-2016-2017-launois-emilie-1/preview-certificat-de-scolarite-3md5z1-2016-2017-launois-emilie-1-1.jpg';
    }
  }
}