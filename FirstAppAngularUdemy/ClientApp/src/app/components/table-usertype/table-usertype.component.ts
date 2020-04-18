import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'table-usertype',
  templateUrl: './table-usertype.component.html',
  styleUrls: ['./table-usertype.component.css']
})
export class TableUsertypeComponent implements OnInit {

  @Input() isSettings: boolean = false;
  headers: string[] = ['Id UserType', 'Name', 'Description'];
  userTypes: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.listUserTypes().subscribe(ut => this.userTypes = ut);
  }

  deleteUserType(idUserType) {
    window.confirm('Are you sure to delete this record?');
    confirm
      ? this.userService.DeleteUserType(idUserType).subscribe(res => {
        this.userService.listUserTypes().subscribe(ut => this.userTypes = ut);
      })
      : window.close();
  }

}
