import { TestBed } from '@angular/core/testing';

import { CommitHttpService } from './commit-http.service';

describe('CommitHttpService', () => {
  let service: CommitHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
