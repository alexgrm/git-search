import { Component, Input } from '@angular/core';
import { GitRepoCardComponent } from '../git-repo-card/git-repo-card.component';
import { GitHubRepoSearchResultItem } from '../shared/models/github.interface';

@Component({
  selector: 'app-search-loading',
  standalone: true,
  imports: [GitRepoCardComponent],
  templateUrl: './search-loading.component.html',
  styleUrl: './search-loading.component.scss',
})
export class SearchLoadingComponent {}
