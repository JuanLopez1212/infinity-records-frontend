import { Component } from '@angular/core';
import { SongsServices } from '../../../services/songs-services';
import { DatePipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-new-form',
  imports: [DatePipe, RouterLink],
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})

export class Song{
   songs: any[any] = [];

  constructor(private songsServices: SongsServices  ){}
 
  ngOnInit(){
    this.onLoadData()
  }

  onLoadData() {
    this.songsServices.getSongs().subscribe({
      next: (data) => {
        console.log(data);
        this.songs = data;
      },
      error: (error)=> {
        console.log(error);
      },
      complete: () => {}
    });
  }

  onDelete(id : string){
   this.songsServices.deleteSongs(id).subscribe({
    next: (data) => {
        console.log(data);
        this.onLoadData()
      },
      error: (error)=> {
        console.log(error);
      },
      complete: () => {}
   })

  }
}


