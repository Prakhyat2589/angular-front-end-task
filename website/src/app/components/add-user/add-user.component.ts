import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment'
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddUserComponent implements OnInit {

  user: User = {
    id: '',
    birthDate: '',
    firstName: '',
    lastName: '',
    gender: '',
    created: '',
  };
  submitted = false;
  maxDate: Date = new Date();

  constructor(private userService: UserService, private meta: Meta, private title: Title, private router: Router) { }

  ngOnInit(): void {
    this.title.setTitle('Website | Add User');
    this.meta.updateTag(
      { name: 'description', content: 'Add new user to the list' });
  }

  saveUser(): void {
    const data = {
      id: this.user.id,
      birthDate: moment(this.user.birthDate).format('YYYY-MM-DD'),
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      gender: this.user.gender,
      created: moment(this.user.created).format('YYYY-MM-DD'),
    };
    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          this.router.navigate(['/site-maintenance']);
          console.log(error);
        });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      id: '',
      birthDate: '',
      firstName: '',
      lastName: '',
      gender: '',
      created: '',
    }

  }
}
