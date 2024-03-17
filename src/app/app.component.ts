import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { GitHubService } from './shared/services/git-hub.service';
import { tap } from 'rxjs';
import {
  GitHubRepoSearchResult,
  GitHubRepoSearchResultItem,
} from './shared/models/github.interface';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { Message } from 'primeng/api/message';
import { GitRepoCardComponent } from './git-repo-card/git-repo-card.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchLoadingComponent } from './search-loading/search-loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    SearchFormComponent,
    SearchResultsComponent,
    MessagesModule,
    MessageModule,
    GitRepoCardComponent,
    SearchLoadingComponent,
  ],
})
export class AppComponent {
  constructor(
    private gitHubService: GitHubService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  isLoading = true;
  messages: Message[] = [];
  searchResults?: GitHubRepoSearchResultItem[];

  get hasResults(): boolean {
    return this.searchResults != undefined;
  }

  onSearch(searchValue: string): void {
    this.setLoadingWhenNoResults();
    this.gitHubService
      .get(searchValue)
      .pipe(
        tap({
          next: () => (this.isLoading = false),
          error: () => (this.isLoading = false),
        })
      )
      .subscribe({
        next: (results) => this.updateResults(results),
        error: (error) => this.showErrors(error),
      });
  }

  setLoadingWhenNoResults() {
    if (!this.hasResults) {
      this.isLoading = true;
    }
  }

  updateResults(results: GitHubRepoSearchResult) {
    this.searchResults = results.items;
    this.changeDetectorRef.detectChanges();
  }

  showErrors(error: HttpErrorResponse) {
    this.messages = [
      {
        severity: 'error',
        summary: error.status.toString(),
        detail: error.message,
      },
    ];
    this.changeDetectorRef.detectChanges();
  }
}
