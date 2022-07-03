import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { customIncrement } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
  value: number;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  addCounterToState(){
    this.store.dispatch(customIncrement({count: this.value}));
  }

}
