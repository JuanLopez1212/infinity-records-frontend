import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Albums } from '../../../services/albums';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-songs',
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './albums.html',
  styleUrl: './albums.css'
})

export class Album {
  albums: any = [];

  constructor ( private albumService: Albums ) {}
  
  ngOnInit() {
    this.albumService.getAlbums().subscribe ({
      next: ( data ) => {
        console.log ( data )
        this.albums = data;
      },
      error: ( error ) => {
        console.error ( error )
      },
      complete: () => {}
    })
  }
}