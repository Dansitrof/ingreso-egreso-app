import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '',
  canLoad: [ AuthGuard ],
    // canActivate: [ AuthGuard ],
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module')
    .then( m => m.IngresoEgresoModule)
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
