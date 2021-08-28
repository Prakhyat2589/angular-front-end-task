import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Meta, Title } from '@angular/platform-browser';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class UserDetailsComponent implements OnInit {

  currentUser: User = {
    id: '',
    birthDate: '',
    firstName: '',
    lastName: '',
    gender: '',
    created: '',
  };
  message = '';
  submitted = false;
  updated = false;
  maxDate: Date = new Date();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Website | Edit User');
    this.meta.updateTag({ name: 'description', content: 'Edit the user details' });
    this.message = '';
    this.getUser(this.route.snapshot.params.id);
  }

  formatDate(data: any): void {
    let { birthDate, created } = data;
    birthDate = moment(data.birthDate).format('YYYY-MM-DD');
    created = moment(data.created).format('YYYY-MM-DD')
    this.currentUser.birthDate = birthDate;
    this.currentUser.created = created;
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          this.formatDate(data)
          console.log(data);
        },
        error => {
          console.log(error);
          if (error.status === 404) {
            this.router.navigate(['**']);
          } else {
            this.router.navigate(['/site-maintenance']);
          }
        });
  }

  updateUser(): void {
    this.message = '';
    this.formatDate(this.currentUser)
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.message = response.message ? response.message : 'This user was updated successfully!';
        },
        error => {
          console.log(error);
        });
    this.updated = true;
  }

  deleteUser(): void {
    this.message = '';
    this.userService.delete(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log('response::', response);
          this.message = response.message ? response.message : 'The user was deleted successfully!';
        },
        error => {
          console.log(error);
        });
    this.submitted = true;
    this.updated = false;
  }

}
