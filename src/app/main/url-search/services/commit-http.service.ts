import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Commit } from 'src/app/shared/models/commit.model';

@Injectable({
  providedIn: 'root'
})
export class CommitHttpService {

  constructor(
    private http: HttpClient
  ) { }

  getCommitsList(user: string, repository: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/repos/${user}/${repository}/commits`)
      .pipe(
        map(commits => this.mapCommits(commits))
      );
  }

  private mapCommits(commits: any): Array<Commit> {
    return commits.map(commit => {
      return {
        user: {
          userName: commit.committer?.login,
          userImage: commit.committer?.avatar_url || 'https://i1.wp.com/www.servicepower.co.uk/wp-content/uploads/Image-Not-Available.jpg?resize=300%2C300&ssl=1',
          userUrl: commit.committer?.html_url
        },
        text: commit.commit?.message,
        url: commit.html_url,
        date: commit.commit?.committer?.date
      };
    });
  }
}
