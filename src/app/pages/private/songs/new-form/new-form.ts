import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlbumsService } from '../../../../services/albums-services';
import { SongsServices } from '../../../../services/songs-services';




@Component({
  selector: 'app-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-form.html',
  styleUrl: './new-form.css'
})

export class SongsNewForm {
formData!: FormGroup ;
albums: any = [];

constructor(
  private albumsServices: AlbumsService,
  private songsServices: SongsServices
  )
  {
  this.formData = new FormGroup({
    title: new FormControl('', [Validators.required]),
    coverUrl: new FormControl('', [Validators.required]),
    fileUrl: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    authors:new FormControl('',[Validators.required]),
    productors:new FormControl('',[Validators.required]),
    albumId: new FormControl('',[Validators.required])
  });
}

onSubmit(){
  console.log(this.formData.value);
  console.log(
    this.formData.valid,
    this.formData.invalid,
    this.formData.pristine,
    this.formData.dirty,
    this.formData.touched
  );

  if(this.formData.valid){

    console.log(this.formData.value);
    this.songsServices.registerSongs(this.formData.value).subscribe({
      next: ( data ) => {
        console.log(data);
      },
      error:(error)=> {
        console.error(error);
      },
      complete:()=>{
        this.formData.reset(); //limpiamos los campos del formulario
      }
    });
  }
}

ngOnInit() {
    this.albumsServices.getAlbums().subscribe({
      next: ( data ) => {
        console.log ( data );
        this.albums = data;
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



