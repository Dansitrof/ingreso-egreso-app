import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardsRoutes } from './dashboard.routes';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardsRoutes,
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild( rutasHijas )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
