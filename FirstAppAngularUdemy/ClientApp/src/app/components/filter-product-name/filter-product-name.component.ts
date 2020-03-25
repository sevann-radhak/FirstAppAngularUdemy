import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/Product.Service';

@Component({
  selector: 'filter-product-name',
  templateUrl: './filter-product-name.component.html',
  styleUrls: ['./filter-product-name.component.css']
})
export class FilterProductNameComponent implements OnInit {

  products: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  searchProducts(productName) {
    productName.value == ""
      ? this.productService.getProduct().subscribe(data => this.products = data)
      : this.productService.searchProducts(productName.value).subscribe(data => this.products = data);
  }

  clear(productName) {
    productName.value = "";
    this.productService.getProduct().subscribe(data => this.products = data)
  }

}
