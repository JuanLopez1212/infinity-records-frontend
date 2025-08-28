import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { UsersService } from '../../../services/users';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-new-register',
  imports: [ReactiveFormsModule],
  templateUrl: './new-register.html',
  styleUrl: './new-register.css'
})
export class NewRegister {
  public formData!: FormGroup;
  public roles: string[] = [ 'artists', 'users' ];
  

  constructor( private usersServices: UsersService , private router: Router) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('users', [Validators.required]),
      artists: new FormGroup({
        name: new FormControl('', [Validators.required]),
        bio: new FormControl('', [Validators.required]),
        genres: new FormControl('', [Validators.required]),
        profileImage: new FormControl('', [Validators.required]),
        socials: new FormGroup({
          instagram: new FormControl('',),
          youtube: new FormControl('',),
          facebook: new FormControl('',)
            })
          }),
    })
  }

  ngOnInit() {
    this.onToggleRol();   // Activa o desactiva formularios anidados por defecto
    this.formData.get( 'role' )?.valueChanges.subscribe( () => this.onToggleRol() );
  }

  onSubmit() {
    if(this.formData.valid){
      console.log(this.formData.value);
      this.usersServices.registerUsers(this.formData.value).subscribe({
        next: ( data ) => {
          console.log( data );
          this.router.navigate(['/login']);
        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {
          this.formData.reset();  //limpiamos los campos del formulari
          //   o 
        }
      })
    }
  }

  onToggleRol() {
    const role = this.formData.get( 'role' )?.value;

    const formDataArtists = this.formData.get( 'artists' ) as FormGroup;
    // const formDataUsers = this.formData.get( 'users' ) as FormGroup;

    if( role == 'artists' ) {
      formDataArtists.enable();
      // formDataUsers.disable();
    }
    else {
      formDataArtists.disable();
      // formDataUsers.enable();
    }
  } 
}
