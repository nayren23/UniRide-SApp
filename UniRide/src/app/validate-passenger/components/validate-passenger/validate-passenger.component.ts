import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/core/services/book/book.service';

@Component({
  selector: 'app-validate-passenger',
  templateUrl: './validate-passenger.component.html',
  styleUrls: ['./validate-passenger.component.css']
})
export class ValidatePassengerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const tripId = this.route.snapshot.queryParamMap.get('trip-id');
    const userId = this.route.snapshot.queryParamMap.get('user-id');
    const code = this.route.snapshot.queryParamMap.get('code');
    if (tripId && userId && code) {
      this.bookService.join(parseInt(tripId), parseInt(userId), parseInt(code)).subscribe({
        next: (response) => {
          this.toastrService.success("Passager vérifié avec succès !", "Validation Réussie");
          setTimeout(() => {
            this.router.navigate([`trips/${tripId}`]);
          }, 1500);
        },
        error: (error) => {
          switch (error.error.message) {
            case 'ONLY_DRIVER_CAN_RESPOND':
              this.toastrService.error("Seul le conducteur peut valider un passager !", "Erreur");
              break;
            case 'TRIP_NOT_STARTED':
              this.toastrService.error("Le trajet n'est pas en cours !", "Erreur");
              break;
            case 'BOOKING_NOT_FOUND':
              this.toastrService.error("La réservation n'existe pas !", "Erreur");
              break;
            case 'BOOKING_NOT_ACCEPTED':
              this.toastrService.error("La réservation n'a pas été acceptée !", "Erreur");
              break;
            case 'PASSENGER_AlREADY_JOINED':
              this.toastrService.error("Le passager a déjà été validé !", "Erreur");
              break;
            case 'INVALID_VERIFICATION_CODE':
              this.toastrService.error("Le code de vérification est invalide !", "Erreur");
              break;
            case 'ONLY_DRIVER_CAN_RESPOND':
              this.toastrService.error("Seul le conducteur peut valider un passager !", "Erreur");
              break;
            default:
              this.toastrService.error("Une erreur s'est produite. Veuillez réessayer plus tard.", "Erreur");
              break;
          }
          setTimeout(() => {
            this.router.navigate([`trips/${tripId}`]);
          }, 1500);
        }
      })
    }
  }

}
