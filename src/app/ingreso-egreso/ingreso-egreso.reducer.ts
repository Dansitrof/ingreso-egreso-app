import { createReducer, on } from '@ngrx/store';
import * as ingresoEgresoActions from './ingreso-egreso.actions';
import { ingresoEgreso } from '../models/ingreso-egreso.models';
import { AppState } from '../app.reducer';

export interface State {
    items: ingresoEgreso[];
}

export interface AppStateWithIngresoEgreso extends AppState {
    ingresosEgresos: State;
}

export const initialState: State = {
   items: [],
};

const _ingresoEgresoReducer = createReducer(initialState,

    on( ingresoEgresoActions.setItems, (state, {items}) => ({ ...state, items: [...items] })),
    on( ingresoEgresoActions.unSetItems, state => ({ ...state, items: [] })),


);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
