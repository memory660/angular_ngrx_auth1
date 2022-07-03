import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { LoginComponent } from './login/login.component';
import { AuthEffects } from "./state/auth.effect";
import { AuthReducer } from "./state/auth.reducer";
import { AUTH_STATE_NAME } from "./state/auth.selector";
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: '', children: [
        { path: '', redirectTo: 'login'},
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignupComponent }
    ]}
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
  ]
})
export class AuthModule {

}