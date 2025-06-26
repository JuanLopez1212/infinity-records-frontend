import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Albums } from '../../../services/albums';


@Component({
  selector: 'app-songs',
  imports: [ReactiveFormsModule],
  templateUrl: './albums.html',
  styleUrl: './albums.css'
})

export class Album {
  constructor ( private albumService: Albums ) {}
  
  ngOnInit() {
    this.albumService.getAlbums().subscribe ({
      next: ( data ) => {
        console.log ( data )
      },
      error: ( error ) => {
        console.error ( error )
      },
      complete: () => {}
    })
  }
}