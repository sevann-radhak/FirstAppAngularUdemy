import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ProductService
{
  urlBase: string = "";

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.urlBase = baseUrl;
  }

  public deleteProduct(idProduct) {
    return this.http.get(`${this.urlBase}api/Product/deleteProduct/${idProduct}`)
      .map(res => res.json());
  }

  public getProduct() {
    return this.http.get(`${this.urlBase}api/Product/ProductsList`).map(res => res.json());
  }

  public listMarks() {
    return this.http.get(`${this.urlBase}api/Product/listMarks`)
      .map(res => res.json());
  }

  public getProductById(productId) {
    return this.http.get(`${this.urlBase}api/Product/getProductById/${productId}`)
      .map(res => res.json());
  }

  public registerProduct(productCLS) {
    return this.http.post(`${this.urlBase}api/Product/registerProduct`, productCLS)
      .map(res => res.json());
  }

  public searchProducts(product) {
    return this.http.get(`${this.urlBase}api/Product/SearchProduct/${product}`)
      .map(res => res.json());
  }

  public searchProductsByCategory(categoryId) {
    return this.http.get(`${this.urlBase}api/Product/SearchProductsByCategory/${categoryId}`)
      .map(res => res.json());
  }

}
