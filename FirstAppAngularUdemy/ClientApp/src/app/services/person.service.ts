import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {

  urlBase: string = "";

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string)
  {
    this.urlBase = baseUrl;
  }

  public getPerson() {
    return this.http.get(`${this.urlBase}api/People/ListPeople`)
      .map(res => res.json());
  }

  public getPersonFilter(name) {
    return this.http.get(`${this.urlBase}api/People/FilterPerson/${name}`)
      .map(res => res.json());
  }

  public createPerson(person) {
    return this.http.post(`${this.urlBase}api/People/savePerson`, person)
      .map(res => res.json());
  }
}
