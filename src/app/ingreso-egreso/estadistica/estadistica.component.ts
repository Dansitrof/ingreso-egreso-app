import { ingresoEgreso } from './../../models/ingreso-egreso.models';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

// ng2-charts
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('ingresosEgresos')
    .subscribe( ({items}) => this.GenerarEstadistica( items ));

  }

  GenerarEstadistica( items: ingresoEgreso[] ) {

    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for (const item of items) {
      if ( item.tipo === 'ingreso' ) {
        this.totalIngresos += parseFloat(item.monto);
        this.ingresos ++;
      } else {
        this.totalEgresos += parseFloat(item.monto);
        this.egresos ++;
      }

    }

    this.doughnutChartData = [ [this.totalIngresos, this.totalEgresos] ];

  }

}
