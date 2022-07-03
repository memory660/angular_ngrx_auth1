export interface SpinnerState {
    isLoading: boolean;
    errorMessage: string;
}

export const initialState: SpinnerState = {
    isLoading: false,
    errorMessage: ''
}
