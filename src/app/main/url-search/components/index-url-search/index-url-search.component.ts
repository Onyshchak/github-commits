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
    const data = this.urlControl.value.split('github.com/');
    if ((data || []).length !== 2) {
      this.commits = [];
      this.errorMessage = 'Is not GitHub';
      return;
    }
    const userName = data[1].split('/')[0];
    const repo = data[1].split('/')[1];
    this.commitHttp.getCommitsList(userName, repo)
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
