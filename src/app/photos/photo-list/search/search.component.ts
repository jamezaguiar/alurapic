import {
  Component,
  OnDestroy,
  OnInit,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onTyping: EventEmitter<string> = new EventEmitter();
  @Input() value: string = '';
  debounce: Subject<string> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe((filter) => this.onTyping.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  onKeyUp(target: EventTarget | null) {
    if (target) {
      let elemento = target as HTMLInputElement;
      this.debounce.next(elemento.value);
    }
  }
}
