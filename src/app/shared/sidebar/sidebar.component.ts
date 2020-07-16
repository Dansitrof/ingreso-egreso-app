import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// NGRX
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';

import { Usuario } from '../../models/usuario.models';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  userSubs: Subscription;

  constructor( private store: Store<AppState>,
               private authservice: AuthService,
               private router: Router ) { }

  ngOnInit(): void {

  this.userSubs = this.store.select('user')
  .pipe(
    filter( ({user}) => user != null && user.nombre != null)
  )
  .subscribe( ({ user }) => this.usuario = user);

  }


  ngOnDestroy(): void {

    this.userSubs.unsubscribe();

  }

  cerrarSesion() {

    Swal.fire({
      title: 'Cerrando Sesión...',
      onBeforeOpen: () => {
      Swal.showLoading();

      }
      });

    this.authservice.cerrarSesion()
     .then( () => {
       Swal.close();
       this.router.navigateByUrl('/login');
     });

  }
  

}
