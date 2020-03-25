import { Component, OnInit, Input } from '@angular/core';

// Service
import { ProductService  } from './../../services/Product.Service'
import { log } from 'util';

@Component({
  selector: 'table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css']
})
export class TableProductComponent implements OnInit {

  @Input() products: any;
  headers: string[] = ["Id Product", "Name", "Price", "Stock", "Category"]

  constructor(private product: ProductService)
  {

  }

  ngOnInit()
  {
    this.product.getProduct().subscribe(
      data => this.products = data
    );
  }

}
