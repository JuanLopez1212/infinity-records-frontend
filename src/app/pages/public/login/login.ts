import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServices } from '../../../services/auth-services';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  formData!: FormGroup

  constructor(private authService: AuthServices, private router: Router){
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
          next: (data: any) => {
            this.authService.saveLocalStorage( 'token', data.token);
            this.router.navigateByUrl('dashboard');
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
