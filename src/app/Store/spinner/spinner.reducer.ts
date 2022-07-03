import { createReducer, on } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "./spinner.action";
import { initialState } from "./spinner.state";

export const _spinnerReducer = createReducer(
    initialState,
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            isLoading: action.status
        }
    }),
    on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMessage: action.message
        }
    })
);
export function SpinnerReducer(state, action){
    return _spinnerReducer(state, action)
}