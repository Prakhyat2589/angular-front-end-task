import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SiteMaintenanceComponent } from './components/site-maintenance/site-maintenance.component';



const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '', component: UsersListComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'site-maintenance', component: SiteMaintenanceComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
