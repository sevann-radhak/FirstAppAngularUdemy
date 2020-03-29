import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonService } from './../../services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-form-person',
  templateUrl: './settings-form-person.component.html',
  styleUrls: ['./settings-form-person.component.css']
})
export class SettingsFormPersonComponent implements OnInit {

  person: FormGroup;

  constructor(private personService: PersonService, private router: Router) {

    this.person = new FormGroup({
      'IdPerson': new FormControl("0"),
      'PhoneNumber': new FormControl("", [Validators.required, Validators.maxLength(10)]),
      'Email': new FormControl("", [Validators.required, Validators.maxLength(150)]),
      'Name': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "apPaterno": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      'apMaterno': new FormControl("", [Validators.required, Validators.maxLength(150)])
    });
  }

  ngOnInit() {
  }

  saveData() {
    this.person.valid
      ? this.personService.createPerson(this.person.value)
        .subscribe(data => { this.router.navigate(["settings-person"]) })
      : null;
  }

}
