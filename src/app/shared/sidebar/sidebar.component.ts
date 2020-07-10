import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor( private authservice: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
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
