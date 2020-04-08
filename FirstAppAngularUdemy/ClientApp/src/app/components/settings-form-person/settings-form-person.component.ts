import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonService } from './../../services/person.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings-form-person',
  templateUrl: './settings-form-person.component.html',
  styleUrls: ['./settings-form-person.component.css']
})
export class SettingsFormPersonComponent implements OnInit {

  person: FormGroup;
  title: string;
  parameter: string;

  constructor(private personService: PersonService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.person = new FormGroup({
      'IdPerson': new FormControl("0"),
      'PhoneNumber': new FormControl("", [Validators.required, Validators.maxLength(10)]),
      'Email': new FormControl("", [Validators.required, Validators.maxLength(150)]),
      'Name': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "apPaterno": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      'apMaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
      'Birthday': new FormControl("", [Validators.required])
    });

    this.activatedRoute.params.subscribe(p => {
      this.parameter = p["id"];
      this.title = this.parameter == "new" ? "Create new Person" : "Edit Person";
    });
  }

  ngOnInit() {
    this.parameter != "new"
      ? this.personService.getPerson(this.parameter).subscribe(p => {
        this.person.controls['IdPerson'].setValue(p.idPerson);
        this.person.controls['PhoneNumber'].setValue(p.phoneNumber);
        this.person.controls['Email'].setValue(p.email);
        this.person.controls['Name'].setValue(p.name);
        this.person.controls['apPaterno'].setValue(p.apPaterno);
        this.person.controls['apMaterno'].setValue(p.apMaterno);
        this.person.controls['Birthday'].setValue(p.birthdayString);
      })
      : undefined;
  }

  saveData() {
    if (this.person.valid) {
      var birthday = this.person.controls['Birthday'].value.split('-');
      var year = birthday[0];
      var month = birthday[1];
      var day = birthday[2];

      this.person.controls['Birthday'].setValue(`${month}/${day}/${year}`);

      this.personService.createPerson(this.person.value)
        .subscribe(data => { this.router.navigate(["settings-person"]) });
    }    
  }
}
