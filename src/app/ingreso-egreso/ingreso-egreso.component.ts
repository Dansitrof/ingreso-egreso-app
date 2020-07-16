import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { ingresoEgreso } from '../models/ingreso-egreso.models';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubs: Subscription;

  constructor( private fb: FormBuilder,
               private ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.loadingSubs = this.store.select('ui').subscribe( ( {isLoading} ) => this.cargando = isLoading);

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });

  }


  ngOnDestroy(): void {

    this.loadingSubs.unsubscribe();

  }


  guardar() {

    this.store.dispatch( ui.isLoading() );

    if ( this.ingresoForm.invalid) {
      return;
    }

    // console.log(this.ingresoForm.valid);
    // console.log(this.ingresoForm.value);
    // console.log(this.tipo);

    const { descripcion, monto } = this.ingresoForm.value;

    const IngresoEgreso = new ingresoEgreso( descripcion, monto, this.tipo );

    this.ingresoEgresoService.crearIngresoEgreso( IngresoEgreso )
    .then( () => {

      this.ingresoForm.reset();
      this.store.dispatch( ui.stopLoading() );
      Swal.fire('Registro creado', descripcion , 'success');

    })
    .catch( error => {
      this.store.dispatch( ui.stopLoading() );
      Swal.fire('Error', error.message, 'error');
    });

  }

}
