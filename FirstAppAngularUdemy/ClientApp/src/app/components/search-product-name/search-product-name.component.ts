import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-product-name',
  templateUrl: './search-product-name.component.html',
  styleUrls: ['./search-product-name.component.css']
})
export class SearchProductNameComponent implements OnInit {

  @Output() clickButton: EventEmitter<any>
  @Output() clearButton: EventEmitter<any>

  constructor()
  {
    this.clickButton = new EventEmitter();
    this.clearButton = new EventEmitter();
  }

  ngOnInit() {
  }

  searchProducts(productName) {
    this.clickButton.emit(productName);
  }

  clear(productName) {
    this.clearButton.emit(productName);
  }

}
