import { Component, Input, OnInit } from '@angular/core';

import { Commit } from 'src/app/shared/models/commit.model';

@Component({
  selector: 'app-commits-list',
  templateUrl: './commits-list.component.html',
  styleUrls: ['./commits-list.component.scss']
})
export class CommitsListComponent implements OnInit {
  @Input() commits: Array<Commit>;

  constructor() { }

  ngOnInit(): void {
  }

}
