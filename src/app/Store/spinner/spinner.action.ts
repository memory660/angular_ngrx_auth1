import { createAction, props } from "@ngrx/store";

export const setLoadingSpinner = createAction(
    '[Spinner] Loading spinner',
    props<{status: boolean}>()
)

export const setErrorMessage = createAction(
    '[Spinner] Error',
    props<{message: string}>()
)