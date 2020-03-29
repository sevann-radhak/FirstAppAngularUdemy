import { Component, OnInit } from '@angular/core';
import { PersonService } from './../../services/person.service'

@Component({
  selector: 'filter-person-name',
  templateUrl: './filter-person-name.component.html',
  styleUrls: ['./filter-person-name.component.css']
})
export class FilterPersonNameComponent implements OnInit {

  people: any;

  constructor(private personService: PersonService) { }

  ngOnInit() {
  }

  search(name) {
    this.personService.getPersonFilter(name.value)
      .subscribe(p => this.people = p);
  }
}
