import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/Product.Service';
import { log } from 'util';

@Component({
  selector: 'filter-product-category',
  templateUrl: './filter-product-category.component.html',
  styleUrls: ['./filter-product-category.component.css']
})
export class FilterProductCategoryComponent implements OnInit {

  products: any;
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  clear(category) {
    category.value = "";
    this.productService.getProduct().subscribe(res => this.products = res);
  }

  searchCategory(category) {
    category.value == ""
      ? this.productService.getProduct()
        .subscribe(res => this.products = res)
      : this.productService.searchProductsByCategory(category.value)
        .subscribe(res => this.products = res);
  }

}
