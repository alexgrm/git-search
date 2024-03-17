import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [InputTextModule, FormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent implements OnInit, OnDestroy {
  private DEBOUNCE_TIME = 300;

  formInputValue = '';
  @Output() searchQueryChange = new EventEmitter<string>();

  searchValue = new Subject<string>();
  trigger = this.searchValue.pipe(
    debounceTime(this.DEBOUNCE_TIME),
    distinctUntilChanged()
  );

  subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.trigger.subscribe((value) =>
      this.emitValidSearchQuery(value)
    );
  }

  emitValidSearchQuery(query: string): void {
    if (this.queryLengthIsValid(query)) {
      this.searchQueryChange.emit(query);
    }
  }

  queryLengthIsValid(query: string) {
    return query.length >= 3;
  }

  onInputValueChange(event: any): void {
    this.searchValue.next(event);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
