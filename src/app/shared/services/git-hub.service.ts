import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubRepoSearchResponse } from '../models/github.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  ENDPOINT = 'https://api.github.com/search/repositories';
  private HEADERS = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  constructor(private http: HttpClient) {}

  get(searchQuery: string): Observable<GitHubRepoSearchResponse> {
    return this.http.get<GitHubRepoSearchResponse>(this.ENDPOINT, {
      headers: this.HEADERS,
      params: { q: searchQuery },
    });
  }
}
