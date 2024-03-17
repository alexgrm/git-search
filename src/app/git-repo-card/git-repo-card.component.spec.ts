import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitRepoCardComponent } from './git-repo-card.component';

describe('GitRepoCardComponent', () => {
  let component: GitRepoCardComponent;
  let fixture: ComponentFixture<GitRepoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitRepoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GitRepoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
