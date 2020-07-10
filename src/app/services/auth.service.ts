import { Injectable } from '@angular/core';

// fireAuth
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore ) { }


  initAuthListener() {

    this.auth.authState.subscribe( fUser => {

      console.log(fUser);
      console.log(fUser?.uid);
      console.log(fUser?.email);

    });

  }


  crearUsuario(nombre: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password)
    .then( ({user}) =>  {
      // user esta destructurado para solo recibir el objeto user
      const newUser = new Usuario(user.uid, nombre, user.email);

      return this.firestore.doc(`${user.uid}/usuario`).set( { ...newUser } );

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
