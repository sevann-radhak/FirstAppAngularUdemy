import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  urlBase: string = "";
  constructor(private http: Http, @Inject("BASE_URL") baseUrl: string) {
    this.urlBase = baseUrl;
  }

  public getUser() {
    return this.http.get(`${this.urlBase}api/Users/ListUser`)
      .map(res => res.json());
  }

  public getUserType() {
    return this.http.get(`${this.urlBase}api/Users/ListUserType`)
      .map(res => res.json());
  }

  public getFilterUserByUserType(IdUserType) {
    return this.http.get(`${this.urlBase}api/Users/FilterUserByUserType/${IdUserType}`)
      .map(res => res.json());
  }
}
