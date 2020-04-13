import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  error: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.user = new FormGroup({
      'NameUser': new FormControl("", [Validators.required]),
      'Password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() { }

  validationControl(controlName) {
    return this.user.controls[controlName].invalid
      && (this.user.controls[controlName].dirty || this.user.controls[controlName].touched)
      ? true
      : false;
  }

  login() {
    if (this.user.valid) {
      this.userService.login(this.user.value).subscribe(res => {
        if (res.idUser == 0) {
          this.error = true;
        } else {
          this.error = false;
          this.router.navigate(['/welcome']);
        }
      });
    }
  }

}
