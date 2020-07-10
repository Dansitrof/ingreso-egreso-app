import { Injectable } from '@angular/core';

// fireAuth
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private store: Store<AppState> ) { }


  initAuthListener() {

    this.auth.authState.subscribe( fUser => {

      // console.log(fUser?.uid);
      if (fUser) {
        // Esiste
        this.userSubscription = this.firestore.doc(`${fUser.uid}/usuarios`).valueChanges()
        .subscribe( (firestoreUser: any) =>  {
          console.log('datosUser', firestoreUser);

          const user = Usuario.fromFirebase( firestoreUser );

          this.store.dispatch( authActions.setUser( {user} ) );
        });
      } else {
        // no existe
        console.log('llamando unSet del user');
        // this.userSubscription.unsubscribe();
        if (this.userSubscription) {
          console.log('se limpia y desubscribe');
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch( authActions.unSetUser() );
      }


    });

  }


  crearUsuario(nombre: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password)
    .then( ({user}) =>  {
      // user esta destructurado para solo recibir el objeto user
      const newUser = new Usuario(user.uid, nombre, user.email);

      return this.firestore.doc(`${user.uid}/usuarios`).set( { ...newUser } );

    });

  }

  iniciarSesion(correo: string, contraseña: string) {

    return this.auth.signInWithEmailAndPassword(correo, contraseña);

  }


  cerrarSesion() {

   return this.auth.signOut();

  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null)
    );
  }


}
