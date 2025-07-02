import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../../services/auth-services';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  formData!: FormGroup

  constructor(private authService: AuthServices){
    this.formData = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(12)])
    });
    }
    onsubmit () {
      if(this.formData.valid){
        console.log(this.formData.value);

        this.authService.loginUser( this.formData.value).subscribe({
          next: (data) => {
            console.log(data);
          },
          error:(error) => {
            console.error(error);
          },
          complete:  () => {
            this.formData.reset();
          }
        });
      }
  }
}
