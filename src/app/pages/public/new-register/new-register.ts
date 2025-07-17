import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UsersService } from '../../../services/users';

@Component({
  selector: 'app-new-register',
  imports: [ ReactiveFormsModule ],
  templateUrl: './new-register.html',
  styleUrl: './new-register.css'
})
export class NewRegister {
  public formData!: FormGroup;
  public roles: string[] = [ 'artists', 'users' ];

  constructor( private userService: UsersService ) {
    this.formData = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl('users'),
      artists: new FormGroup({
        name: new FormControl(),
        bio: new FormControl(),
        genres: new FormControl(),
        profileImage: new FormControl()
      }),
      // users: new FormGroup({
      //   nombre: new FormControl(),
      //   descripcion: new FormControl(),
      //   logoUrl: new FormControl(),
      //   sitioWeb: new FormControl()
      // })
    })
  }

  ngOnInit() {
    this.onToggleRol();   // Activa o desactiva formularios anidados por defecto
    this.formData.get( 'role' )?.valueChanges.subscribe( () => this.onToggleRol() );
  }

  onSubmit() {
    if( this.formData.valid ) {
      console.log( this.formData.value );

      // this.userService.registerNewUser( this.formData.value ).subscribe({
      //   next: ( data ) => {
      //     console.log( data );
      //   },
      //   error: ( error ) => {
      //     console.error( error );
      //   },
      //   complete: () => {
      //     this.formData.reset()
      //   }
      // })
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
