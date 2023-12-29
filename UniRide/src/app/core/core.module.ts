import { NgModule, LOCALE_ID } from '@angular/core';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpInterceptorProviders } from './interceptors';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookComponent } from './components/book/book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { DistancePipe } from './pips/distance/distance.pipe';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessagesModule } from 'primeng/messages';
import { AccordionModule } from 'primeng/accordion';
import { BlockUIModule } from 'primeng/blockui';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [
    DistancePipe,
    NavbarComponent,
    BookComponent,
    BooksListComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    PanelModule,
    ConfirmDialogModule,
    BadgeModule,
    SidebarModule,
    PanelMenuModule,
    MenuModule,
    MenubarModule,
    OverlayPanelModule,
    MessagesModule,
    TableModule,
    AccordionModule,
    BlockUIModule,
    FieldsetModule,
    MultiSelectModule,
    DataViewModule,
    TagModule,
    ImageModule,
    ConfirmPopupModule,
    ToastModule,
    ChartModule,
    InputTextareaModule,
  ],
  exports: [
    CardModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    PanelModule,
    ConfirmDialogModule,
    BadgeModule,
    SidebarModule,
    PanelMenuModule,
    MenuModule,
    MenubarModule,
    OverlayPanelModule,
    MessagesModule,
    TableModule,
    AccordionModule,
    BlockUIModule,
    FieldsetModule,
    MultiSelectModule,
    DataViewModule,
    TagModule,
    ImageModule,
    ConfirmPopupModule,
    ToastModule,
    ChartModule,
    InputTextareaModule,
    DistancePipe,
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
