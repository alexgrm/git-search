import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { GitHubService } from './git-hub.service';

describe('GitHubService', () => {
  let spectator: SpectatorHttp<GitHubService>;
  const createHttp = createHttpFactory(GitHubService);

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  it('should make a GET request to the GitHub endpoint when the service get method observable is subscribed to', () => {
    let query = 'exampleQuery';

    spectator.service.get(query).subscribe();
    spectator.expectOne(
      `${spectator.service.ENDPOINT}?q=${query}`,
      HttpMethod.GET
    );
  });
});
