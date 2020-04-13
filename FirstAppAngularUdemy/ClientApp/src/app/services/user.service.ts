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

  public getUserById(idUser) {
    return this.http.get(`${this.urlBase}api/Users/getUser/${idUser}`)
      .map(res => res.json());
  }

  public getUserType() {
    return this.http.get(`${this.urlBase}api/Users/ListUserType`)
      .map(res => res.json());
  }

  public getFilterUserByUserType(idUserType) {
    return this.http.get(`${this.urlBase}api/Users/FilterUserByUserType/${idUserType}`)
      .map(res => res.json());
  }

  public login(userCLS) {
    return this.http.post(`${this.urlBase}api/Users/login`, userCLS)
      .map(res => res.json());
  }

  public saveData(userCLS) {
    console.log(userCLS);

    return this.http.post(`${this.urlBase}api/Users/saveData`, userCLS)
      .map(res => res.json());
  }

  public validateUserExsts(idUser, name) {
    return this.http.get(`${this.urlBase}api/Users/validateUserExsts/${idUser}/${name}`)
      .map(res => res.json());
  }
}
