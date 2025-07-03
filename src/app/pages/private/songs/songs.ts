import { Component } from '@angular/core';
import { SongsServices } from '../../../services/songs-services';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-new-form',
  imports: [],
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})

export class Song{
   songs: any = [];

  constructor(private songsServices: SongsServices  ){}
 
  ngOnInit(){
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

  onDelete(id : String){
    console.log(id);

  }
}


