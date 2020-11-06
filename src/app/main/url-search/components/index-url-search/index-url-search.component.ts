import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Commit } from 'src/app/shared/models/commit.model';
import { CommitHttpService } from 'src/app/main/url-search/services/commit-http.service';

@Component({
  selector: 'app-index-url-search',
  templateUrl: './index-url-search.component.html',
  styleUrls: ['./index-url-search.component.scss']
})
export class IndexUrlSearchComponent implements OnInit {

  searchForm: FormGroup;
  commits: Array<Commit> = [];
  errorMessage = '';
  defaultUser = {
    name: '',
    repo: ''
  };

  constructor(
    private fb: FormBuilder,
    private commitHttp: CommitHttpService,
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.getDefaultCommits();
  }

  getCommits(): void {
    this.removeError();
    const data = this.searchForm.get('url').value.split('github.com/');
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

  removeError(): void {
    this.errorMessage = '';
  }

  private getDefaultCommits(): void {
    this.commitHttp.getCommitsList(this.defaultUser.name, this.defaultUser.repo)
      .subscribe(
        commits => this.commits = commits,
        error => {
          this.commits = [];
          this.errorMessage = error.error.message;
        });
  }

  private createFormGroup(): void {
    const regexUrlValidation = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.searchForm = this.fb.group({
      url: ['', [Validators.pattern(regexUrlValidation), Validators.required]]
    });
  }
}
