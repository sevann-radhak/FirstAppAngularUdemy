import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-person-name',
  templateUrl: './search-person-name.component.html',
  styleUrls: ['./search-person-name.component.css']
})
export class SearchPersonNameComponent implements OnInit {

  @Output() searchName: EventEmitter<any>;

  constructor() {
    this.searchName = new EventEmitter();
  }

  ngOnInit() {
  }

  search(name) {
    this.searchName.emit(name);
  }

}
