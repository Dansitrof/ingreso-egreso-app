import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubcription: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router ) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.uiSubcription = this.store.select('ui')
    .subscribe( ui => {

      // console.log(ui.isLoading);

      this.cargando = ui.isLoading;

    });

  }


  ngOnDestroy(): void {

    this.uiSubcription.unsubscribe();

  }

  crearUsuario() {

    if (this.registroForm.invalid) {
      return;
    }

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: 'Espere por favor...',
    //   onBeforeOpen: () => {
    //   Swal.showLoading();

    //   }
    //   });

    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, password )
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
