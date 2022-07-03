import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { logoutAction } from "../auth/state/auth.action";
import { AuthResponseData } from "../models/authResponseData.model";
import { User } from "../models/user.model";
import { AppState } from "../Store/app.state";

@Injectable(
    { providedIn: 'root'}
)
export class AuthService {
    timeoutInterval: any;
    constructor(private http: HttpClient, private store: Store<AppState>){}

    login(email: string, password: string): Observable<AuthResponseData>{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`;
        return this.http.post<AuthResponseData>(url, {email, password, returnSecureToken: true});
    }

    formatUserData(data: AuthResponseData){
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
        const user = new User(data.email, data.idToken, data.localId, expirationDate);
        return user;
    }

    signup(email: string, password: string): Observable<AuthResponseData> {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`;
        return this.http.post<AuthResponseData>(url, {email, password, returnSecureToken: true})
    }

    setUserInLocalStorage(user: User){
        localStorage.setItem('userdata', JSON.stringify(user));
        this.runTimeoutInterval(user);
    }

    runTimeoutInterval(user: User){
        const curTime = new Date().getTime();
        const expirationTime = user.expirationTime;
        const timeInterval = expirationTime - curTime;
        this.timeoutInterval = setTimeout(() => {
            this.store.dispatch(logoutAction());
        }, timeInterval);
    }

    getUserFromLocalStorage(){
        const userDataStr = localStorage.getItem('userdata');
        if(userDataStr){
            const userdata = JSON.parse(userDataStr);
            const expirationDate = new Date(userdata.expirationDate);
            const user = new User(userdata.email, userdata.token, userdata.localId, expirationDate);
            this.runTimeoutInterval(user);
            return user;
        }
        return null;
    }

    logout(){
        localStorage.removeItem('userdata');
        if(this.timeoutInterval){
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
    }
}