import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ResultpageComponent } from './resultpage/resultpage.component';

const routes: Routes = [
  {path:'', component: HomepageComponent},
  {path:'results/:query/:pageNumber', component: ResultpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }