import { createReducer, on } from '@ngrx/store';
import * as ingresoEgresoActions from './ingreso-egreso.actions';
import { ingresoEgreso } from '../models/ingreso-egreso.models';

export interface State {
    items: ingresoEgreso[];
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
