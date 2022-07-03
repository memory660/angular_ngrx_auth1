import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLoginAction } from './auth/state/auth.action';
import { AppState } from './Store/app.state';
import { getErrorMessage, getSpinnerStatus } from './Store/spinner/spinner.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading: Observable<boolean> ;
  errorMessage: string;
  constructor(private store: Store<AppState>){}

  ngOnInit() {
    this.isLoading = this.store.select(getSpinnerStatus);
    this.store.select(getErrorMessage).subscribe(message => this.errorMessage = message);
    this.store.dispatch(autoLoginAction())
  }
}
