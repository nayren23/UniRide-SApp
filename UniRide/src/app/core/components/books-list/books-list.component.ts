import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Book } from '../../models/book.models';
import { BookService } from '../../services/book/book.service';
import { tap } from 'rxjs';
import { OverlayPanel } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

interface TableRowSelectEvent {
  originalEvent?: Event;
  data?: any;
  type?: string;
  index?: number;
}


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, AfterViewInit {
  items: MenuItem[] | undefined;
  books: Book[] = [];
  subscriptionComplete: boolean = false;
  selectedBook?: Book;
  onhold: boolean = false;

  constructor(private bookService: BookService, private messageService: MessageService) { }

  ngAfterViewInit(): void {
    this.onhold = true;
  }

  ngOnInit() {
    this.getBooks()
  }

  getBooks() {
    this.bookService.getBookOfCurrentUser().pipe(
      tap((data: any) => {
        data.bookings.forEach((book: any) => {
          this.books.push(
            {
              accepted: book.accepted,
              date_requested: new Date(book.date_requested),
              passenger_count: book.passenger_count,
              trip: {
                id: book.trip.trip_id,
                arrival_address: book.trip.arrival_address,
                departure_address: book.trip.departure_address,
                departure_date: new Date(book.trip.departure_date)
              },
              user: {
                id: book.user.id,
                firstname: book.user.firstname,
                lastname: book.user.lastname,
                profile_picture: book.user.profile_picture,

              }
            }
          );
        });
        this.sortDescByDateRequested();
      })
    ).subscribe(() => {
      this.subscriptionComplete = true;
    });
  }

  sortDescByDateRequested(): void {
    this.books.sort((a, b) => {
      if (a.date_requested == undefined || b.date_requested == undefined) {
        return 0; // or some other logic to handle undefined cases
      }

      const dateA = new Date(a.date_requested);
      const dateB = new Date(b.date_requested);

      return dateB.getTime() - dateA.getTime();
    });

  }
  getTimeElapsed(dateInput: Date | string): string {
    const inputDate = new Date(dateInput);
    const now = new Date();
    const dateUTC = inputDate.getTime() - (inputDate.getTimezoneOffset() * 60000);
    const nowUTC = now.getTime() - (now.getTimezoneOffset() * 60000);

    const elapsed = nowUTC - dateUTC;

    const minutes = Math.floor(elapsed / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (hours < 24) {
      return `${hours} heures`;
    } else {
      return `${days} jours`;
    }
  }

  convertToFrenchDate(date: Date) {
    return date.toLocaleString('fr-FR', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
  }

  bookOnHold(status: number) {
    return status != 0 && this.onhold;
  }

  answerBook(trip_id: number, user_id: number, response: number, book: Book) {
    this.bookService.answerBook(trip_id, user_id, response).subscribe({
      next: (data: any) => { book.accepted = response },
      error: (error: any) => { this.messageService.add({ severity: 'danger', summary: 'Erreur', detail: 'Une erreur s\'est produite' }) }
    });
  }
}
