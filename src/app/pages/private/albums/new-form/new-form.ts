import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersServices } from '../../../../services/users-services';
import { Albums } from '../../../../services/albums-services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-form.html',
  styleUrl: './new-form.css',
})
export class AlbumNewForm {
  formData!: FormGroup;
  users: any = []

  constructor ( 
    private userService: UsersServices, 
    private albumService: Albums,
    private router: Router
  ) {
    this.formData = new FormGroup({
      title: new FormControl ( '', [ Validators.required ] ),
      cover_url: new FormControl ( '', [ Validators.required ] ),
      date_release: new FormControl ()
    });
  }

  onSubmit () {
    console.log ( this.formData.value ) 
    console.log ( 
      this.formData.valid,
      this.formData.invalid,
      this.formData.pristine,
      this.formData.dirty,
      this.formData.touched
    )

    if ( this.formData.valid ) {
      console.log ( this.formData.value )
      this.albumService.registerAlbum( this.formData.value ).subscribe({
        next: ( data ) => {
          console.log ( data )
          this.router.navigateByUrl('/artistsp')
        },
        error: ( error ) => {
          console.error ( error )
        },
        complete: () => {
          this.formData.reset() // Limpiamos los campos del formulario
        }
      })
    }
  }


  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: ( data ) => {
        console.log ( data )
        this.users = data 
      },
      error: ( error ) => {
        console.log ( error )
      },
      complete: () => {
        console.log ( 'Complete' )
      }
    })
  }
  ngOnDestroy() {
    console.log( 'ngOnDestroy' );
  }
}
