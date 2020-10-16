import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})

export class SearchbarComponent implements OnInit {
  searchQuery = 'Today';
  constructor( private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit(): void {
  }
  
  updateQuery(id: string, selectVal: string) {

    this.searchQuery = selectVal;
    console.log(selectVal);
  }
  goToResults() {
   // this.router.navigate( ['/results', this.searchQuery, '1']);
  window.location.href = '/results/' + this.searchQuery + '/1';
  }
}

