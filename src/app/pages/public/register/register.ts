import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formData!: FormGroup;
users:any=["users", "artists", "manager", "company"]
categories:any  = [];
role: any;

  constructor(
    private usersServices: UsersService
  ) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required ]),
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),

    });
  }

  onSubmit(){
    console.log(
      this.formData.valid,
      this.formData.invalid,
      this.formData.pristine,
      this.formData.dirty,
      this.formData.touched
    );

    if(this.formData.valid){
      console.log(this.formData.value);
      this.usersServices.registerUsers(this.formData.value).subscribe({
        next: ( data ) => {
          console.log( data );
        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {
          this.formData.reset();  //limpiamos los campos del formulario 
        }
      })
    }
  
  }
  // ngOnChanges() {
  //   console.log( 'ngOnChanges' );
  // }
  // ngOnInit() {
  //   console.log( 'ngOnInit' );
  // }
  // ngDoCheck() {
  //   console.log( 'ngDoCheck' );
  // }
  // ngAfterContentInit() {
  //   console.log( 'ngAfterContentInit' );
  // }
  // ngAfterContentChecked() {
  //   console.log( 'ngAfterContentChecked' );
  // }
  // ngAfterViewInit() {
  //   console.log( 'ngAfterViewInit' );
  // }
  // ngAfterViewChecked() {
  //   console.log( 'ngAfterViewChecked' );
  // }
  // afterEveryRender() {
  //   console.log( 'afterEveryRender' );
  // }
  // ngOnDestroy() {
  //   console.log( 'ngOnDestroy' );
  // }


}



