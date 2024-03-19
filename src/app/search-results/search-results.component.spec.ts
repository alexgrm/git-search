import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SearchResultsComponent } from './search-results.component';
import { mockSearchResult } from '../shared/mocks/github.mock';

describe('SearchResultsComponent', () => {
  let spectator: Spectator<SearchResultsComponent>;
  const createComponent = createComponentFactory(SearchResultsComponent);

  beforeEach(
    () =>
      (spectator = createComponent({
        props: {
          results: mockSearchResult.items,
        },
      }))
  );

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render a result card for each search result', () => {
    expect(spectator.queryAll('app-git-repo-card').length).toEqual(
      mockSearchResult.items.length
    );
  });

  it('should not render a no results message when there are results', () => {
    expect(spectator.query('.no-search-results')).not.toExist();
  });

  it('should render a no results message when there are no results', () => {
    spectator.setInput({ results: [] });
    expect(spectator.query('.no-search-results')).toExist();
  });

  it('should not render any cards when there are no results', () => {
    spectator.setInput({ results: [] });
    expect(spectator.query('.search-results')).not.toExist();
  });
});
