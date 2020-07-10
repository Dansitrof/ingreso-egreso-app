import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

// SweetAlert
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubcription: Subscription;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private store: Store<AppState>,
               private router: Router
                ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group( {
      correo: ['test@gmail.com', [Validators.required, Validators.email]],
      contraseña: ['123456', [Validators.required, Validators.minLength(6)]]
    });

    this.uiSubcription = this.store.select('ui')
    .subscribe( ui => {
      this.cargando = ui.isLoading;
      console.log('cargando subs', this.cargando );
    });

  }

  ngOnDestroy(): void {
    // Necesitamos desuscribirnos del observable para impiar todo, cancelar la suscripción y eliminar al observador de la lista interna.
    this.uiSubcription.unsubscribe();
  }

  iniciarSesion() {

    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    // title: 'Espere por favor...',
    // onBeforeOpen: () => {
    // Swal.showLoading();

    // }
    // });

    const {correo, contraseña} = this.loginForm.value;

    this.auth.iniciarSesion( correo, contraseña )
    .then( credenciales => {

      console.log(credenciales);
      // Swal.close();

      this.store.dispatch( ui.stopLoading() );

      this.router.navigateByUrl('/');

    })
    .catch( error => {
      console.error(error);

      this.store.dispatch( ui.stopLoading() );

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });

    });

  }

}
