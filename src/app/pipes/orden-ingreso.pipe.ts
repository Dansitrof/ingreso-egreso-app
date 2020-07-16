import { ingresoEgreso } from './../models/ingreso-egreso.models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform( items: ingresoEgreso[] ): ingresoEgreso[] {

    return items.slice().sort( (a, b) =>  {

      if (a.tipo === 'ingreso') {
        return -1;
      } else{
        return 1;
      }

    });
  }

}
