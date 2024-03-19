import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let spectator: Spectator<SearchFormComponent>;
  const createComponent = createComponentFactory(SearchFormComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have an input', () => {
    expect(spectator.query('input')).toExist();
  });

  it('should subscribe to the trigger when the component is initialized', () => {
    const triggerSubscribeSpy = spyOn(spectator.component.trigger, 'subscribe');
    spectator.component.ngOnInit();
    expect(triggerSubscribeSpy).toHaveBeenCalled();
  });

  it('should emit a search query when valid calling emitValidSearchQuery', () => {
    const emitSpy = spyOn(spectator.component.searchQueryChange, 'emit');
    spectator.component.emitValidSearchQuery('angular');
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should return true when calling queryLengthIsValid with a query of 3 letters', () => {
    let result = spectator.component.queryLengthIsValid('ang');
    expect(result).toEqual(true);
  });

  it('should return true when calling queryLengthIsValid with a query of more than 3 letters', () => {
    let result = spectator.component.queryLengthIsValid('angular');
    expect(result).toEqual(true);
  });

  it('should return false when calling queryLengthIsValid with a query of less than 3 letters', () => {
    let result = spectator.component.queryLengthIsValid('an');
    expect(result).toEqual(false);
  });

  it('should call next on the searchValue observable when calling onInputValueChange using the provided value', () => {
    const nextSpy = spyOn(spectator.component.searchValue, 'next');
    spectator.component.onInputValueChange('angular');
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should unsubscribe the subscription on component destroy', () => {
    const unsubscribeSpy = spyOn(
      spectator.component.subscription!,
      'unsubscribe'
    );
    spectator.component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
