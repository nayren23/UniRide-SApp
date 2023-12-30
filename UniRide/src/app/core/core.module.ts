import { NgModule, LOCALE_ID } from '@angular/core';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpInterceptorProviders } from './interceptors';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookComponent } from './components/book/book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccordionModule } from 'primeng/accordion';
import { BlockUIModule } from 'primeng/blockui';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    NavbarComponent,
    BookComponent,
    BooksListComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    MenubarModule,
    OverlayPanelModule,
    TableModule,
    AccordionModule,
    BlockUIModule,
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    HttpInterceptorProviders
  ]
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr);
  }
}
