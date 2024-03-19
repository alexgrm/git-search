import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GitRepoCardComponent } from './git-repo-card.component';
import { mockSearchResult } from '../shared/mocks/github.mock';

describe('GitRepoCardComponent', () => {
  let spectator: Spectator<GitRepoCardComponent>;
  const createComponent = createComponentFactory(GitRepoCardComponent);

  beforeEach(
    () =>
      (spectator = createComponent({
        props: {
          cardData: mockSearchResult.items[0],
        },
      }))
  );

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show a skeleton layout when loading', () => {
    spectator.setInput({ isLoading: true });
    expect(spectator.queryAll('p-skeleton').length).toEqual(3);
  });

  it('should not show any text when loading', () => {
    spectator.setInput({ isLoading: true });
    expect(spectator.query('p')).not.toExist();
  });

  it('should show the description for the provided GitHub repository', () => {
    let expectedValue = mockSearchResult.items[0].description;
    let actualValue = spectator.query('.description')?.innerHTML;
    expect(actualValue).toEqual(expectedValue);
  });

  it('should show the language for the provided GitHub repository', () => {
    let expectedValue = `Language: ${mockSearchResult.items[0].language}`;
    let actualValue = spectator.query('.language')?.innerHTML;
    expect(actualValue).toEqual(expectedValue);
  });

  it('should show the license for the provided GitHub repository', () => {
    let expectedValue = `License: ${mockSearchResult.items[0].license?.name}`;
    let actualValue = spectator.query('.license')?.innerHTML;
    expect(actualValue).toEqual(expectedValue);
  });

  it('should show the last updated for the provided GitHub repository', () => {
    expect(spectator.query('.updated')).toExist();
  });

  it('should not show a skeleton when not loading', () => {
    expect(spectator.query('p-skeleton')).not.toExist();
  });
});
