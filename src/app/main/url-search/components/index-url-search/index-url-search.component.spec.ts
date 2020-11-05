import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexUrlSearchComponent } from './index-url-search.component';

describe('IndexUrlSearchComponent', () => {
  let component: IndexUrlSearchComponent;
  let fixture: ComponentFixture<IndexUrlSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexUrlSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexUrlSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
