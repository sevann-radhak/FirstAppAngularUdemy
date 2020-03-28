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

  public getProduct() {
    return this.http.get(`${this.urlBase}api/Product/ProductsList`).map(res => res.json());
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
