import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore);

  initAuthListener() {
    this.auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    Swal.fire({
      title: 'Espere por Favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        Swal.close();
        this.router.navigate(['/']);
        const newUser = new Usuario(user.uid, nombre, email);
        const useRef = collection(this.firestore, `user`);
        return addDoc(useRef, { ...newUser });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'ok',
        });
      });
  }

  loginUsuario(email: string, password: string) {
    Swal.fire({
      title: 'Espere por Favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    signInWithEmailAndPassword(this.auth, email, password)
      .then((credenciales) => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'ok',
        });
      });
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return new Observable((subscriber) => {
      const unsubscribe = this.auth.onAuthStateChanged(subscriber);
      return { unsubscribe };
    }).pipe(map((fUser) => fUser != null));
  }
}
