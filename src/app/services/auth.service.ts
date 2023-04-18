import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  crearUsuario(nombre: string, email: string, password: string) {
    Swal.fire({
      title: 'Espere por Favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((credenciales) => {
        Swal.close();
        this.router.navigate(['/']);
        console.log(credenciales);
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
        console.log(credenciales);
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
}