import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  //Atributo de la clase
  formData!: FormGroup;  //mombre del formulario

  constructor(){
    //Define la agrupacion de campos del formulario
    this.formData = new FormGroup({
      username: new FormControl('', [ Validators.required , Validators.email ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
      
    });
  }

  onSubmit(){

    if(this.formData.valid){

      console.log(this.formData.value);
    }
  }
}
