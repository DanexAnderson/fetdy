import * as fromUI from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {

  ui: fromUI.State;
}

export const reducers: ActionReducerMap<State> = {

  ui: fromUI.uiReducer
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);












/* export interface State {

  isLoading: boolean;
}

const initialState: State = {

  isLoading: false
};

export function appReducer(state = initialState, action) {

  switch (action.type) {

    case 'START_LOADING': return { isLoading: true };
    case 'STOP_LOADING': return { isLoading: false };
    default: return state;

  }

} */
