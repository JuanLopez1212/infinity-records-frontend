import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SongsServices } from '../../../../services/songs-services';
import { Albums } from '../../../../services/albums-services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SongsInterface } from '../../../../interfaces/songs-interface';

@Component({
  selector: 'app-song-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './song-edit.html',
  styleUrl: './song-edit.css'
})
export class SongEdit {
formData!: FormGroup ;
albums: any = [];
selectedId! : string ;

constructor(
  private songsServices: SongsServices,
  private albumsServices : Albums,
  private router: Router,
  private activatedRoute: ActivatedRoute
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

formatDateToYMD(dateStr: Date): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // meses 0-11
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

onSubmit(){

  if(this.formData.valid){

    console.log(this.formData.value);
    this.songsServices.updateSongs(this.selectedId, this.formData.value). subscribe({
      next : (data) => {
        console.log(data);
        this.router.navigateByUrl('dashboard/songs')
      },
      error : (error) => {
        console.log(error);
      },
      complete: ()=> {}
    })
  }
}

ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (data) => {
        console.log(data['id'])
        this.selectedId = data['id'] 
        this.songsServices.getSongsbyId(data['id']).subscribe({
          next: (data) => {
            console.log(data)
            console.log(this.formatDateToYMD(data.releaseDate));
            this.formData.patchValue({
              title: data.title ,
              coverUrl: data.coverUrl ,
              fileUrl: data.fileUrl,
              releaseDate: this.formatDateToYMD(data.releaseDate),
              genre:  data.genre,
              authors: data.authors,
              productors: data.productors,
              albumId: data.albumId
            })
          },
          error:(error) => {
            console.log(error)
          },
          complete :() => {}
        })
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    })
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




