import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SearchLoadingComponent } from './search-loading.component';

describe('SearchLoadingComponent', () => {
  let spectator: Spectator<SearchLoadingComponent>;
  const createComponent = createComponentFactory(SearchLoadingComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have three placeholder Git Repo Cards', () => {
    expect(spectator.queryAll('app-git-repo-card').length).toEqual(3);
  });

  it('should have all placeholder Git Repo Cards in a loading state', () => {
    let cards = spectator.queryAll('app-git-repo-card');

    for (const card of cards) {
      expect(card.getAttribute('ng-reflect-is-loading')).toEqual('true');
    }
  });
});
