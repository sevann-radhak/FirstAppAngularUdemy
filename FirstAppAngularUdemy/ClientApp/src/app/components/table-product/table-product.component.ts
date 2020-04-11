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
  @Input() isSettings: false;
  headers: string[] = ["Id Product", "Name", "Price", "Stock", "Category"]

  constructor(private productService: ProductService)
  {

  }

  ngOnInit()
  {
    this.productService.getProduct().subscribe(
      data => this.products = data
    );
  }

  deleteProduct(idProduct) {
    window.confirm('Are you sure to delete this record?');
    confirm
      ? this.productService.deleteProduct(idProduct).subscribe(data => {
        this.productService.getProduct().subscribe(p => this.products = p)
      })
      : window.close();
  }
}
