import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;

  constructor() {
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

}
