import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent implements OnInit {
  // @Output() inc = new EventEmitter<void>();
  // @Output() decr = new EventEmitter<void>();
  // @Output() reset = new EventEmitter<void>();
  constructor(private store: Store<{counter: CounterState}>) { }

  ngOnInit(): void {
  }
  onIncrement(){
    // this.inc.emit();
    this.store.dispatch(increment());
  }
  onDecrement(){
    // this.decr.emit();
    this.store.dispatch(decrement());
  }
  onReset(){
    // this.reset.emit();
    this.store.dispatch(reset());
  }

}
