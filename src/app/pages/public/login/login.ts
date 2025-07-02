import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  formData!: FormGroup

  constructor(){
    this.formData = new FormGroup ({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(12)])
    });
    }
    onsubmit () {
      if(this.formData.valid){
        console.log(this.formData.value)
      }
  }
}
