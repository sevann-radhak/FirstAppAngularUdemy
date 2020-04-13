import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {

  @Input() users: any;
  @Input() isSettings: boolean = false;
  headers: string[] = ["ID", "Username", "Name", "User type"];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(u => this.users = u);
  }

  deleteUser(idUser) {
    alert('delete user function')
  }

}
