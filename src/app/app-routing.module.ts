import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { SummaryComponent } from './components/summary/summary.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { BoardComponent } from './components/board/board.component';

import { DialogTaskComponent } from './components/board/dialog-task/dialog-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactDetailComponent } from './components/contacts/contact-detail/contact-detail.component';
import { HelpComponent } from './components/help/help.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/summary' },
  {
    path: 'summary',
    component: SummaryComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'board',
    component: BoardComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'board/:id',
    component: DialogTaskComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'addtask',
    component: AddTaskComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'contact-detail/:id',
    component: ContactDetailComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'help',
    component: HelpComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'legalnotice',
    component: LegalNoticeComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'signup',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
