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
  menus: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getSession().subscribe(data => {
      if (data) {
        this.login = true
        this.userService.listPages().subscribe(m => { this.menus = m });
      } else {
        this.login = false;
        this.router.navigate(['/login']);
      }
      
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
      this.collapse();
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
