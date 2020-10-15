import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
console.log(`jQuery version: ${$.fn.jquery}`);
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ResultpageComponent,
    SearchbarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    InfiniteScrollModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
