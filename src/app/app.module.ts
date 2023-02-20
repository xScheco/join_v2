import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { LoginComponent } from './components/login/login.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { BoardComponent } from './components/board/board.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FilterPipe } from './services/filter.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './components/header/header.component';
import { BottomnavComponent } from './components/bottomnav/bottomnav.component';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogTaskComponent } from './components/board/dialog-task/dialog-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';

import { DialogEditTaskComponent } from './components/board/dialog-edit-task/dialog-edit-task.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactDetailComponent } from './components/contacts/contact-detail/contact-detail.component';
import { DialogEditContactComponent } from './components/contacts/dialog-edit-contact/dialog-edit-contact.component';
import { DialogAddContactComponent } from './components/contacts/dialog-add-contact/dialog-add-contact.component';
import { DialogForgetPasswordComponent } from './components/login/dialog-forget-password/dialog-forget-password.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { HelpComponent } from './components/help/help.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SummaryComponent,
    SidenavComponent,
    HeaderComponent,
    BottomnavComponent,
    SignUpComponent,
    BoardComponent,
    DialogTaskComponent,
    AddTaskComponent,
    FilterPipe,
    DialogEditTaskComponent,
    ContactsComponent,
    ContactDetailComponent,
    DialogEditContactComponent,
    DialogAddContactComponent,
    DialogForgetPasswordComponent,
    SnackBarComponent,
    HelpComponent,
    LegalNoticeComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    DragDropModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatRippleModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
  ],
  providers: [BoardComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
