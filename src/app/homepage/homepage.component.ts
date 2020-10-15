import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  searchQuery = '';
  constructor() { }

  ngOnInit(): void {
    this.getAllCards();
  }
  getAllCards() {
    var xhttp = new XMLHttpRequest();
    var data = null;
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
         // Typical action to be performed when the document is ready:
         console.log(JSON.parse(this.responseText));
         var responseObj = JSON.parse(this.responseText)
      }
    }
    xhttp.open("GET", "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards");
    xhttp.setRequestHeader("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com");
    xhttp.setRequestHeader("x-rapidapi-key", "ad2d5e1988mshaf187ed2494f60bp1258a4jsne733ba5dd9fb");
    xhttp.send(data);
  }

}
