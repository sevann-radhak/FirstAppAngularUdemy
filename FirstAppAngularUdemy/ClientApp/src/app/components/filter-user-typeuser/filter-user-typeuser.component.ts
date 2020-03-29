import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-filter-user-typeuser',
  templateUrl: './filter-user-typeuser.component.html',
  styleUrls: ['./filter-user-typeuser.component.css']
})
export class FilterUserTypeuserComponent implements OnInit {

  users: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  filter(event) {
    event.value == ""
      ? this.userService.getUser().subscribe(u => this.users = u)
      : this.userService.getFilterUserByUserType(event.value).subscribe(u => this.users = u)
  }
}
