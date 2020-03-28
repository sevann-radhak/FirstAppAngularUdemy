import { Injectable,  Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  urlBase: string;

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string)
  {
    this.urlBase = baseUrl;
  }

  public getCategories() {
    return this.http.get(`${this.urlBase}api/Categories/CategoriesList`)
      .map(res => res.json());
  }
}
