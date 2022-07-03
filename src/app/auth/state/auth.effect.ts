import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import { autoLoginAction, loginStartAction, loginSuccessAction, logoutAction, signupStartAction, signupSuccessAction } from "./auth.action";
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { AppState } from "src/app/Store/app.state";
import { Store } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "src/app/Store/spinner/spinner.action";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects{
    constructor(private actions$: Actions, 
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router){}

    loginEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStartAction),
            mergeMap((action) => {
                return this.authService.login(action.email, action.password)
                        .pipe(
                            map(data => {
                                this.store.dispatch(setLoadingSpinner({status: false}));
                                this.store.dispatch(setErrorMessage({message: ''}));
                                const user = this.authService.formatUserData(data);
                                this.authService.setUserInLocalStorage(user);
                                return loginSuccessAction({user, redirect: true});
                            }),
                            catchError(errorResponse => {
                                this.store.dispatch(setLoadingSpinner({status: false}));
                                return of(setErrorMessage({message: errorResponse.error.error.message}));
                            })
                        );
            })
        );
    });

    loginRedirectEffect$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(...[loginSuccessAction, signupSuccessAction]),
                tap((action) => {
                    if(action.redirect){
                        this.router.navigate(['/']);
                    }
                }
                )   
            );
        }, 
        {dispatch: false}
    );

    signupEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupStartAction),
            mergeMap((action) => {
                return this.authService.signup(action.email, action.password)
                        .pipe(
                            map(data => {
                                this.store.dispatch(setLoadingSpinner({status: false}));
                                this.store.dispatch(setErrorMessage({message: ''}));
                                const user = this.authService.formatUserData(data);
                                this.authService.setUserInLocalStorage(user);
                                return signupSuccessAction({user, redirect: true})
                            }),
                            catchError(errorResponse => {
                                this.store.dispatch(setLoadingSpinner({status: false}));
                                return of(setErrorMessage({message: errorResponse.error.error.message}));
                            })
                        )
            })
            )
    });

    autoLoginEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLoginAction),
            mergeMap(action => {
                const user = this.authService.getUserFromLocalStorage();
                return of(loginSuccessAction({user, redirect: false}));
            })
        )
    });

    logoutEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logoutAction),
            map((action) => {
                this.authService.logout();
                this.router.navigate(['/auth']); 
            })
        );
    }, 
        {dispatch: false}
    );

}