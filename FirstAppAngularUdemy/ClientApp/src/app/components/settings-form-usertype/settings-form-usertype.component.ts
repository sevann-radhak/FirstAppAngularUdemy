import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'settings-form-usertype',
  templateUrl: './settings-form-usertype.component.html',
  styleUrls: ['./settings-form-usertype.component.css']
})
export class SettingsFormUsertypeComponent implements OnInit {

  userType: FormGroup;
  title: string;
  parameter: string;
  pages: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService) {

    this.userType = new FormGroup({
      'IdUserType': new FormControl("0"),
      'Description': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'Name': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'values': new FormControl("")
    });

    this.activatedRoute.params.subscribe(p => {
      this.parameter = p["id"];
      this.title = this.parameter == "new" ? "Create new User Type" : "Edit User Type";
    });
  }

  ngOnInit() {
    this.userService.ListUserTypePages().subscribe(p => this.pages = p);
    this.parameter != "new"
      ? this.userService.ListPagesRecover(this.parameter).subscribe(p => {
        this.userType.controls['IdUserType'].setValue(p.idUserType);
        this.userType.controls['Description'].setValue(p.description);
        this.userType.controls['Name'].setValue(p.name);

        var listPages = p.listPageCLS.map(lp => lp.iidpagina);
        // Print list pages
        setTimeout(() => {
          var checks = document.getElementsByClassName('check');
          var nchecks = checks.length;
          var check;
          for (var i = 0; i < nchecks; i++) {
            check = checks[i];
            var index = listPages.indexOf(check.name * 1);
            if (index > -1) {
              check.checked = true;
            }
          }
        }, 500);

        this.userType.controls['values'].setValue(p.values);
      })
      : undefined;
  }

  saveData() {
    if (this.userType.valid) {
      this.userService.saveDataUserType(this.userType.value).subscribe(res => {
        this.router.navigate(['/settings-usertype']);
      });
    }
  }

  validationControl(controlName) {
    return this.userType.controls[controlName].invalid
      && (this.userType.controls[controlName].dirty || this.userType.controls[controlName].touched)
      ? true
      : false;
  }

  viewCheck() {
    var selecteds = '';
    var checks = document.getElementsByClassName('check');
    var check;

    for (var i = 0; i < checks.length; i++) {
      check = checks[i];
      check.checked ? selecteds += `${check.name}$` : null;
    }

    selecteds != '' ? selecteds = selecteds.substring(0, selecteds.length - 1) : null;
    this.userType.controls['values'].setValue(selecteds);
  }

}
