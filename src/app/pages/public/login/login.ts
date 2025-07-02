import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../../services/auth-services';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Atributos de la clase
  formData!: FormGroup

  constructor ( private authService: AuthServices ) {
    // Define la agrupación de campos del formulario
    this.formData = new FormGroup({
      email: new FormControl ( '', [ Validators.required, Validators.email ] ),
      password: new FormControl ( '', [ Validators.required, Validators.minLength ( 6 ), Validators.maxLength ( 12 )] )
    });
  }

  onSubmit () {
    if ( this.formData.valid ) {
      console.log ( this.formData.value )

      this.authService.loginUser ( this.formData.value ).subscribe({
        next: ( data ) => {
          console.log ( data )
        },
        error: ( error ) => {
          console.log ( error )
        },
        complete: () => {
          this.formData.reset()
        }
      }) 
    }
  }
}
