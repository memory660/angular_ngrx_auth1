import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';
import { getCounter } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  // @Input() counter: number;
  counterSubscription: Subscription;
  counter: number = 0;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.counterSubscription = this.store.select(getCounter).subscribe(data => {
      this.counter = data;
    })
  }
  ngOnDestroy(): void {
    if(this.counterSubscription){
      this.counterSubscription.unsubscribe();
    }
  }
}
