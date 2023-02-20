import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DialogAddContactComponent } from '../dialog-add-contact/dialog-add-contact.component';
import { DialogEditContactComponent } from '../dialog-edit-contact/dialog-edit-contact.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  @Input() selectedContact: any;
  delete: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService,
    private dialog: MatDialog,
    private authService: AuthService,
    public auth: Auth
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.firestore.get('users', data.get('id')).subscribe((d) => {
        this.selectedContact = d;

        if (d) {
          this.delete =
            this.selectedContact.email === this.auth.currentUser.email;
        }
      });
    });
  }

  ngDoCheck() {
    if (this.selectedContact) {
      this.delete =
        this.selectedContact.email || '' === this.auth.currentUser.email;
    }
  }

  openEditDialog() {
    this.dialog.open(DialogEditContactComponent, {
      panelClass: 'dialog-edit-container',
      data: {
        user: this.selectedContact,
      },
    });
  }

  openAddDialog() {
    this.dialog.open(DialogAddContactComponent, {
      panelClass: 'dialog-add-container',
    });
  }

  deleteContact() {
    this.firestore.delete('users', this.selectedContact.costomid);
    this.authService.deleteUsers();
  }
}
