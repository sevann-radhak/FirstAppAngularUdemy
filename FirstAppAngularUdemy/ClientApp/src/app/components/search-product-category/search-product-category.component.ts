import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'search-product-category',
  templateUrl: './search-product-category.component.html',
  styleUrls: ['./search-product-category.component.css']
})

export class SearchProductCategoryComponent implements OnInit {

  categories: any;
  @Output() searchButton: EventEmitter<any>
  @Output() clearButton: EventEmitter<any>

  constructor(private categorieService: CategoryService)
  {
    this.searchButton = new EventEmitter()
    this.clearButton = new EventEmitter()
  }

  ngOnInit() {
    this.categorieService.getCategories().subscribe(
      c => this.categories = c)
  }

  public searchCategory(category) {
    this.searchButton.emit(category);
  }

  public clear(category) {
    this.clearButton.emit(category);
  }

}
