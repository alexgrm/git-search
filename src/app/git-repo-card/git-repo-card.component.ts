import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { GitHubRepoSearchResultItem } from '../shared/models/github.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-git-repo-card',
  standalone: true,
  imports: [CardModule, SkeletonModule, DatePipe],
  templateUrl: './git-repo-card.component.html',
  styleUrl: './git-repo-card.component.scss',
})
export class GitRepoCardComponent {
  @Input() isLoading = false;
  @Input() cardData?: GitHubRepoSearchResultItem;
}
