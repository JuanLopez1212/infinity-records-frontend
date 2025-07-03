import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServices } from '../../../services/auth-services';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  //Atributo de la clase
  formData!: FormGroup;  //mombre del formulario

  constructor(private authservice: AuthServices, private router: Router){
    //Define la agrupacion de campos del formulario
    this.formData = new FormGroup({
      email: new FormControl('', [ Validators.required , Validators.email ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
      
    });
  }

  onSubmit(){

    if(this.formData.valid){

      console.log(this.formData.value);

      this.authservice.loginUser(this.formData.value).subscribe({
        next: (data: any )=> {
          this.authservice.saveLocalStorage('token', data.token); //Almacena el token en el localStorage
          this.router.navigateByUrl('dashboard');  //esta ruta debe existir 
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.formData.reset();
        }
      });
    }
  }
}

