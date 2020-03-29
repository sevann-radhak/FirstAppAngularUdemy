import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'search-user-typeuser',
  templateUrl: './search-user-typeuser.component.html',
  styleUrls: ['./search-user-typeuser.component.css']
})
export class SearchUserTypeuserComponent implements OnInit {

  @Output() userType: EventEmitter<any>;
  userTypes: any;

  constructor(private userService: UserService) {
    this.userType = new EventEmitter();
  }

  ngOnInit() {
    this.userService.getUserType().subscribe(ut => this.userTypes = ut);
  }

  filter(userType) {
    this.userType.emit(userType);
  }
}
