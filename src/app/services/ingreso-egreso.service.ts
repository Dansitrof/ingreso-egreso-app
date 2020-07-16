import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ingresoEgreso } from '../models/ingreso-egreso.models';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService) { }

  crearIngresoEgreso( ingresoEgreso: ingresoEgreso) {

    const uid = this.authService.user.uid;
    // borrar la propiedad porqué firebase lo crea
    delete ingresoEgreso.uid;

    return this.firestore.doc(`${uid}/ingresos-egresos`)
    .collection('items')
    .add({ ...ingresoEgreso } );
  }

  InitIngresosEgresosListener( uid: string ) {

    // se agrega idField para que cuando traiga los items agregue el id
    return this.firestore.collection(`${ uid }/ingresos-egresos/items`)
    .valueChanges({ idField: 'uid' })

    // Forma mas Extensa para obtener el id, primero obtienes el id y lo unes con los items
    // .snapshotChanges()
    // .pipe(
    //   map( snapshot => {
    //     return snapshot.map( doc => {
    //       const data: any = doc.payload.doc.data();
    //       return {
    //         uid: doc.payload.doc.id,
              //  ...doc.payload.doc.data()
    //       };
    //     });
    //   })
    // )
    // .subscribe( items => {

    //   console.log(items);

    // });

  }

  borrarIngresoEgreso( uidItem: string ) {
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${ uid }/ingresos-egresos/items/${ uidItem }`).delete();

  }

}
