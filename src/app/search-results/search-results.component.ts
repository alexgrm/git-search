import { Component, Input } from '@angular/core';
import { GitRepoCardComponent } from '../git-repo-card/git-repo-card.component';
import { GitHubRepoSearchResultItem } from '../shared/models/github.interface';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [GitRepoCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  @Input() results?: GitHubRepoSearchResultItem[] = [];

  get hasNoResults(): boolean {
    return this.results?.length == 0 || this.results == undefined;
  }
}
