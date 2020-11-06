import { Component, Input, OnInit } from '@angular/core';

import { Commit } from 'src/app/shared/models/commit.model';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent implements OnInit {
  @Input() commits: Array<Commit>;

  constructor() { }

  ngOnInit(): void {
  }

}
