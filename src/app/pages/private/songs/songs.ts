import { Component } from '@angular/core';
import { Songs } from '../../../services/songs';


@Component({
  selector: 'app-new-form',
  imports: [],
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})

export class Song{

  constructor(private songsServices: Songs  ){}


  ngOnInit(){
    this.songsServices.getSongs().subscribe({
      next: () => {},
      error: ()=> {},
      complete: () => {}
    });
  }
}


