import { createReducer, on } from "@ngrx/store";
import { loginSuccessAction, logoutAction, signupSuccessAction } from "./auth.action";
import { initialState } from "./auth.state";

const _authReducer = createReducer(
    initialState,
    on(loginSuccessAction, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(signupSuccessAction, (state,action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(logoutAction, (state) => {
        return {
            ...state,
            user: null
        }
    })
);

export function AuthReducer(state, action) {
    return _authReducer(state,action);
}