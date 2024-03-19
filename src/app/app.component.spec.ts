import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { GitHubService } from './shared/services/git-hub.service';
import { mockError } from './shared/mocks/http-error.mock';
import { mockSearchResult } from './shared/mocks/github.mock';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    componentMocks: [GitHubService],
  });

  beforeEach(() => (spectator = createComponent({})));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should add a message list with a message containing the error details when showErrors is called', () => {
    spectator.component.showErrors(mockError);
    expect(spectator.component.messages.length).toEqual(1);
    expect(spectator.component.messages[0].detail).toEqual(mockError.message);
  });

  it('should set searchResults to the items in a GitHubRepoSearchResponse when updateResults is called', () => {
    spectator.component.updateResults(mockSearchResult);
    expect(spectator.component.searchResults?.length).toEqual(
      mockSearchResult.items.length
    );
    expect(spectator.component.searchResults![0].name).toEqual(
      mockSearchResult.items[0].name
    );
  });

  it('should set loading to true when calling setLoadingWhenNoResults and there are currently no results', () => {
    spectator.component.searchResults = undefined;
    spectator.component.isLoading = false;
    spectator.component.setLoadingWhenNoResults();
    expect(spectator.component.isLoading).toEqual(true);
  });

  it('should not set loading to true when calling setLoadingWhenNoResults and there are currently no results', () => {
    spectator.component.searchResults = mockSearchResult.items;
    spectator.component.isLoading = false;
    spectator.component.setLoadingWhenNoResults();
    expect(spectator.component.isLoading).toEqual(false);
  });

  it('should return true when accessing hasResults and searchResults is not undefined', () => {
    spectator.component.searchResults = mockSearchResult.items;
    expect(spectator.component.hasResults).toEqual(true);
  });

  it('should return false when accessing hasResults and searchResults is undefined', () => {
    spectator.component.searchResults = undefined;
    expect(spectator.component.hasResults).toEqual(false);
  });
});
