import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// SweetAlert
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private router: Router ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group( {
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  iniciarSesion() {

    if (this.loginForm.invalid) {
      window.alert('Mod');
      console.log('modificaron el disabled');
      return;
    }


    Swal.fire({
    title: 'Espere por favor...',
    onBeforeOpen: () => {
    Swal.showLoading();

    }
    });

    const {correo, contraseña} = this.loginForm.value;

    this.auth.iniciarSesion( correo, contraseña )
    .then( credenciales => {

      console.log(credenciales);
      Swal.close();
      this.router.navigateByUrl('/');

    })
    .catch( error => {
      console.error(error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });

    });

  }

}
