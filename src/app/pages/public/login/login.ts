import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../services/auth-services';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Atributos de la clase
  formData!: FormGroup

  constructor(private authService: AuthServices, private router: Router) {
    // Define la agrupación de campos del formulario
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    });
  }


  onSubmit() {
    console.log(this.formData.invalid);
    if (this.formData.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario o contraseña son incorrectas, por favor vuelve a intentarlo",
        background: "#1e1e1e", // color de fondo
        color: "#ffffff",      // color del texto
        confirmButtonText: "Volver a intentar",
        confirmButtonColor: "#0f0", // color del botón
        customClass: {
          icon: 'my-error-icon',
          popup: 'my-popup-error', // clase personalizada para la caja
        }
      });

    }


    if (this.formData.valid) {
      console.log(this.formData.value)

      this.authService.loginUser(this.formData.value).subscribe({
        next: (data: any) => {
          console.log('login ', data);
          this.authService.saveLocalStorage('token', data.token)
          // TODO: Revisar que guarde en el localStorage los datos del usuario
          // this.authService.saveLocalStorage( 'userData', data.user );
          this.router.navigateByUrl('dashboard')  // Esta ruta debe existir
        },
        error: (error) => {
          // console.log ( error )
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario o contraseña son incorrectas, por favor vuelve a intentarlo",
            background: "#1e1e1e", // Color de fondo
            color: "#ffffff",       // Color de texto
            confirmButtonText: "Volver a intentar", // Texto del botón
            confirmButtonColor: "#ff4d4d", // Color del botón
          });

        },
        complete: () => {
          this.formData.reset()
        }
      })
    }

  }
}
