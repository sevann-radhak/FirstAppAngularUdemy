import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  login: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getSession().subscribe(data => {
      this.login = data ? true : false;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  logout() {
    this.collapse();
    this.userService.logout().subscribe(res => {
      if (res.value == "OK") {
        this.login = false;
        this.router.navigate(['/login']);
    }
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
