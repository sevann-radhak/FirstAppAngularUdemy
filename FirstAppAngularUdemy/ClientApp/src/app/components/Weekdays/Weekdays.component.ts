import { Component } from '@angular/core'

@Component({
  selector: "week-days",
  templateUrl: "./Weekdays-component.html"
}
)

export class Weedkdays {
  name: string = "Sevann"
  courses: string[] = ["LinQ", "Ado.net", "Asp.net MVC", "Angular"]
  person: Object = {
    name: "Aleej",
    lastname: "Radhak"
  }
  link: string = "https://www.google.com"
}
