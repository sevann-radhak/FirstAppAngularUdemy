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
        this.userService.listPages().subscribe(p => this.menus = p);

        // Actualizar en el nav menu html las opciones para que tome con un ngFor las de menues,
        // pero habría que cambiar todas las paths en el appmodule para que hagan match con los valores en bd
        // esto permitiría ver el menu que le corresponde a cada usuario según su tipo de usuario ;)

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
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
