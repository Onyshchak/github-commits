import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Commit } from 'src/app/shared/models/commit.model';
import { CommitHttpService } from 'src/app/main/url-search/services/commit-http.service';

@Component({
  selector: 'app-index-url-search',
  templateUrl: './index-url-search.component.html',
  styleUrls: ['./index-url-search.component.scss']
})
export class IndexUrlSearchComponent implements OnInit {

  urlControl: FormControl;
  commits: Array<Commit> = [];
  errorMessage = '';

  constructor(
    private commitHttp: CommitHttpService,
  ) {
    this.setUrlControl();
  }

  ngOnInit(): void {
  }

  getCommits(): void {
    this.errorMessage = '';
    const data = new URL(this.urlControl.value).pathname.split('/');
    if ((data || []).length < 3) {
      this.commits = [];
      this.errorMessage = 'Not found';
      return;
    }
    this.commitHttp.getCommitsList(data[1], data[2])
      .subscribe(
        commits => this.commits = commits,
        error => {
          this.commits = [];
          this.errorMessage = error.error.message;
        });
  }

  private setUrlControl(): void {
    const regexUrlValidation = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.urlControl = new FormControl('', [Validators.pattern(regexUrlValidation), Validators.required]);
  }
}
