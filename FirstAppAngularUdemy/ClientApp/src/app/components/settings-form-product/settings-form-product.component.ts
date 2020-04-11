import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from './../../services/Product.Service';
import { CategoryService } from './../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings-form-product',
  templateUrl: './settings-form-product.component.html',
  styleUrls: ['./settings-form-product.component.css']
})
export class SettingsFormProductComponent implements OnInit {

  product: FormGroup;
  categories: any;
  marks: any;
  title: string;
  parameter: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router) {
    this.product = new FormGroup({
      'IdProduct': new FormControl("0"),
      'ProductName': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'ProductPrice': new FormControl("0", Validators.required),
      'ProductStock': new FormControl("0", Validators.required),
      'idmarca': new FormControl("", Validators.required),
      'idcategoria': new FormControl("", Validators.required)
    });

    this.activatedRoute.params.subscribe(p => {
      this.parameter = p["id"];
      this.title = this.parameter == "new" ? "Create new Product" : "Edit Product";
    });
  }

  ngOnInit() {
    this.productService.listMarks().subscribe(m => this.marks = m);
    this.categoryService.getCategories().subscribe(c => this.categories = c);
    this.parameter != "new"
      ? this.productService.getProductById(this.parameter).subscribe(p => {
        console.log(p);
        this.product.controls['IdProduct'].setValue(p.idProduct);
        this.product.controls['ProductName'].setValue(p.productName);
        this.product.controls['ProductPrice'].setValue(p.productPrice);
        this.product.controls['ProductStock'].setValue(p.productStock);
        this.product.controls['idmarca'].setValue(p.markCLS.iidmarca);
        this.product.controls['idcategoria'].setValue(p.categoryCLS.idCategory);
      })
      : undefined;
  }

  saveData() {
    if (this.product.valid) {
      this.productService.registerProduct(this.product.value)
        .subscribe(resp => this.router.navigate(['./settings-product']));
    }
  }
}
