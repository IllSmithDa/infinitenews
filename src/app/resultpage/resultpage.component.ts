import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import axios from 'axios';
import { Url }from 'url';
@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.scss'],
  
})
export class ResultpageComponent implements OnInit {
  searchQuery = '';
  resultList = [];
  previousSecondVal = 0;
  previousVal = 0;
  currentVal = 1;
  nextVal= 2;
  firstPage = false;
  lastPage = false;
  middlePage = false;
  offsetVal = 0;
  numberOfClicks=0;
  newIndex = 1;
  constructor(private route: ActivatedRoute) {
    
   }
   /*
  @HostListener('window:scroll', ['$event.target'])
   onScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    console.log(pos)
    if(pos <= max )   {
      //Do your action here
        this.offsetVal += 1;
        this.getMoreNews();
        console.log('hello')
      }
  }
  */
  ngOnInit(): void {
    console.log('hello')
  //  this.searchQuery = localStorage.getItem('wonderlandNewsQuery');
    this.searchQuery = this.route.snapshot.paramMap.get("query");
    this.currentVal = Number(this.route.snapshot.paramMap.get("pageNumber"));
    if (this.currentVal > 1) {
      let tempVal = this.currentVal - 1;
      this.offsetVal = tempVal * 10;
    }
    console.log('query: ' + typeof(this.searchQuery));
    this.getAllNews();
    this.checkPagination();
  }

  getAllNews() {
    axios({
      method: 'get',
      url: 'https://webit-news-search.p.rapidapi.com/search',
      params: {
        "freshness": "Day",
        "textFormat": "Raw",
        "safeSearch": "Off",
        "q": this.searchQuery,
        "offset": this.offsetVal
      },
      headers: {
        "x-rapidapi-host": "webit-news-search.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
  
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
    })
  }
  getMoreNews() {
    axios({
      method: 'get',
      url: 'https://webit-news-search.p.rapidapi.com/search',
      params: {
        "freshness": "Day",
        "textFormat": "Raw",
        "safeSearch": "Off",
        "q": this.searchQuery,
        "offset": this.offsetVal
      },
      headers: {
        "x-rapidapi-host": "webit-news-search.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
  
        "useQueryString": true
      }
    })
    .then((data) => {
      let results = data.data.data.results;
        console.log(data);
        for (let i = 0; i < results.length; i++) {
          results[i].provider = (new URL(results[i].url)).hostname;

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
        this.resultList = results;
    })
  }
  checkPagination() {
    if (this.currentVal === 1 ) {
      this.firstPage = true;
      this.lastPage = false;
      this.middlePage = false;
    }
    if (this.currentVal > 1 && this.currentVal < 10) {
      this.firstPage = false;
      this.lastPage = false;
      this.middlePage = true;
      this.previousVal = this.currentVal - 1;
      this.nextVal = this.currentVal + 1;
    }
    if (this.currentVal >= 10) {
      this.firstPage = false;
      this.lastPage = true;
      this.middlePage = false;
      this.previousVal = this.currentVal - 1;
      this.previousSecondVal = this.currentVal - 2;
    }
  }
}
