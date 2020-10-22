import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  searchQuery = '';
  resultList = [];
  offsetVal = 0;
  newIndex = 1;
  constructor() { }

  ngOnInit(): void {
    this.getTrendingNews();
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
  getTrendingNews() {
    axios({
      method: 'get',
      url: 'https://rapidapi.p.rapidapi.com/trending',
      params: {
        "offset": this.offsetVal
      },
      headers: {
        "x-rapidapi-host": "webit-news-search.p.rapidapi.com",
        "x-rapidapi-key": environment.rapidApiKey,
        "useQueryString": true
      }
    })
    .then((data) => {
      let results = data.data.data.results;

        console.log(data);
        for (let i = 0; i < results.length; i++) {
          results[i].provider = (new URL(results[i].url)).hostname;
          results[i].newsIndex = this.newIndex;
          this.newIndex += 1;
          if (results[i].description === undefined) {
            results[i].description = "No Description Available";
          } else {
            var txt = document.createElement("textarea");
            txt.innerHTML = results[i].description;
            results[i].description = txt.value.replace( /(<([^>]+)>)/ig, '');
          }
            /*
            let newImageObj = {
              thumbnail: {
                contentUrl: 'https://ctt.trains.com/sitefiles/images/no-preview-available.png'
              }
            }
            */
           if (results[i].image === undefined) {
            results[i].image = 'https://ctt.trains.com/sitefiles/images/no-preview-available.png';
          }
          if (results[i].description === undefined) {
            results[i].description = "No Description Available";
          }
        }
        if (this.resultList.length === 0) {
          this.resultList = results;
        } else {
          this.resultList = this.resultList.concat(results);
        }
        this.offsetVal += 10;
        document.getElementById('loader-container').style.display = 'none';
    })
  }
}
