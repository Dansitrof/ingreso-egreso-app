import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  userSubs: Subscription;
  ingresosEgresosSubs: Subscription;

  ngOnInit(): void {

    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }) => {
        console.log('user:', user);

        this.ingresosEgresosSubs = this.ingresoEgresoService.InitIngresosEgresosListener(user.uid)
          .subscribe((ingresosEgresosFB: any) => {
            console.log('ingresosEgresosFB', ingresosEgresosFB);
            this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresosEgresosFB }));
          });

      });

  }

  ngOnDestroy(): void {

    this.userSubs.unsubscribe();
    this.ingresosEgresosSubs.unsubscribe();

  }


}
