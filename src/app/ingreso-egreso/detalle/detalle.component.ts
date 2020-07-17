import { ingresoEgreso } from './../../models/ingreso-egreso.models';
import { Component, OnInit, OnDestroy } from '@angular/core';

// NGRX
import { Store } from '@ngrx/store';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: ingresoEgreso[];
  ingresosEgresosSubs: Subscription;

  constructor( private store: Store<AppStateWithIngresoEgreso>,
               private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit(): void {

    this.ingresosEgresosSubs = this.store.select('ingresosEgresos')
    .subscribe( ({items}) => this.ingresosEgresos = items);

  }

  ngOnDestroy(): void {

    this.ingresosEgresosSubs.unsubscribe();

  }


  borrar( uid: string) {

    this.ingresoEgresoService.borrarIngresoEgreso( uid )
    .then( () => Swal.fire('Borrado', 'Item Borrado', 'success') )
    .catch( error =>  Swal.fire('Error', error.message, 'error') );
    console.log(uid);
  }

}
