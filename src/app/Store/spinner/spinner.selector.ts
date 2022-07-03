import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SpinnerState } from "./spinner.state";

export const SPINNER_STATE_NAME = 'spinner';

export const getSpinnerState = createFeatureSelector<SpinnerState>(SPINNER_STATE_NAME);

export const getSpinnerStatus = createSelector(getSpinnerState, (state) => {
    return state.isLoading
})

export const getErrorMessage = createSelector(getSpinnerState, (state) => {
    return state.errorMessage
})