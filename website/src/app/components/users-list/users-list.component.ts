import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  currentUser: User = {};
  currentIndex = -1;
  firstName = '';
  page = 1;
  count = 0;
  tableSize = 4;
  tableSizesArr = [4, 8, 12];

  constructor(private userService: UserService, private meta: Meta, private title: Title, private router: Router) { }

  ngOnInit(): void {
    this.title.setTitle('Website | User List');
    this.meta.updateTag({ name: 'description', content: 'Extract the list of users from server' });
    this.retrieveUsers();
  }

  retrieveUsers(): void {

    this.userService.getAll()
      .subscribe(
        data => {
          this.users = JSON.parse(JSON.stringify(data)).items;
          console.log('User List::', JSON.parse(JSON.stringify(data)).items);
        },
        error => {
          console.log(error);
          this.router.navigate(['/site-maintenance']);
        });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  tabSize(event: any) {
    this.page = event;
    this.retrieveUsers();
  }

  tableData(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.retrieveUsers();
  }
}
