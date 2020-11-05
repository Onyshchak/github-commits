import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IndexUrlSearchComponent } from './components/index-url-search/index-url-search.component';
import { CommitsListComponent } from './components/commits-list/commits-list.component';

const routes = [
  {
    path: '',
    component: IndexUrlSearchComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    IndexUrlSearchComponent,
    CommitsListComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule
  ]
})
export class UrlSearchModule { }
