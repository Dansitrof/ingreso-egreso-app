import { createAction, props } from '@ngrx/store';
import { ingresoEgreso } from './../models/ingreso-egreso.models';

export const unSetItems = createAction('[IngresoEgreso] UnSet Items');

export const setItems = createAction(
    '[IngresoEgreso] Set Items',
    props< { items: ingresoEgreso[] }>()
    );



