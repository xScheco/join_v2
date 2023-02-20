import { Component, HostListener, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { ColorService } from 'src/app/services/color.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  isMobile: boolean = false;
  isActive: boolean = false;
  groupedUsers: any = [];
  selectedContact: any;

  constructor(
    private firestore: FirestoreService,
    public colors: ColorService
  ) {}

  ngOnInit(): void {
    this.firestore.getAll('users').subscribe((users) => {
      this.sortUserInList(users);
    });
    this.isMobile = window.innerWidth <= 903;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 903;
  }

  sortUserInList(users: any) {
    this.groupedUsers = Object.values(
      users.reduce((groups: any, user: any) => {
        const letter = user['firstname'][0];
        groups[letter] = groups[letter] || { letter, users: [] };
        groups[letter].users.push(user);
        return groups;
      }, {})
    );
    this.groupedUsers.sort((a: any, b: any) =>
      a.letter.localeCompare(b.letter)
    );
  }

  showContactDetails(contact: any) {
    this.selectedContact = contact;
  }
}
