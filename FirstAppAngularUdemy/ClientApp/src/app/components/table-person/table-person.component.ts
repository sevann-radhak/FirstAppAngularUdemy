import { Component, OnInit, Input } from '@angular/core';
import { PersonService } from './../../services/person.service';

@Component({
  selector: 'table-person',
  templateUrl: './table-person.component.html',
  styleUrls: ['./table-person.component.css']
})
export class TablePersonComponent implements OnInit {

  @Input() people: any;
  @Input() isSettings: boolean = false;
  headers: string[] = ["ID", "Name", "Phone", "Email"];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.getPerson()
      .subscribe(p => this.people = p);
  }

}
