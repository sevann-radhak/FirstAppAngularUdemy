import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from './../../services/person.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'settings-form-user',
  templateUrl: './settings-form-user.component.html',
  styleUrls: ['./settings-form-user.component.css']
})
export class SettingsFormUserComponent implements OnInit {

  user: FormGroup;
  parameter: string = '';
  title: string = '';
  people: any;
  userTypes: any;
  viewForm: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    private router: Router,
    private userService: UserService )
  {
    this.user = new FormGroup({
      'IdUser': new FormControl("0"),
      'NameUser': new FormControl("", [Validators.required, Validators.maxLength(100)], this.validationUniqueUser.bind(this)),
      'Password': new FormControl("", Validators.required),
      'PasswordCheck': new FormControl("", [Validators.required, this.validatePasswordCheck.bind(this)]),
      'Person': new FormControl("", Validators.required),
      'UserType': new FormControl("", Validators.required)
    });

    this.activatedRoute.params.subscribe(p => {this.parameter = p['id']});
  }

  ngOnInit() {
    if (this.parameter == 'new') {
      this.title = 'Create new user';
      this.viewForm = true;
    } else {
      this.title = 'Edit user';
      this.viewForm = false;
      this.userService.getUserById(this.parameter).subscribe(u => {
        this.user.controls['IdUser'].setValue(u.idUser);
        this.user.controls['NameUser'].setValue(u.nameUser);
        this.user.controls['UserType'].setValue(u.userType.idUserType);

        // Values only for valid form
        this.user.controls['Password'].setValue('1');
        this.user.controls['PasswordCheck'].setValue('1');
        this.user.controls['Person'].setValue(null);
      })
    }
    
    this.personService.ListPeopleCombo().subscribe(p => this.people = p);
    this.userService.getUserType().subscribe(ut => this.userTypes = ut);
  }

  saveData() {
    if (this.user.valid) {
      console.log(this.user);
      console.log(this.user.value);
      this.userService.saveData(this.user.value).subscribe(res => {
        this.router.navigate(['/settings-user']);
      });
    }
  }

  validationControl(controlName) {
    return this.user.controls[controlName].invalid
      && (this.user.controls[controlName].dirty || this.user.controls[controlName].touched)
      ? true
      : false;
  }

  validatePasswordCheck(control: FormControl) {
    if (control.value != '' && control.value != null) {
      return this.user.controls['Password'].value != control.value ? { passwordNotEquals: true } : null;
    }
  }

  validationUniqueUser(control: FormControl) {
    let promise = new Promise((resolve, reject) => {
      if (control.value != '' && control.value != null) {
        this.userService.validateUserExsts(this.user.controls["IdUser"].value, this.user.controls["NameUser"].value)
          .subscribe(data => {
            resolve(data == 1 ? { existsUser: true } : null);
          })
      }
    });

    return promise;
  }

}
