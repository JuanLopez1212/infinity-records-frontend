import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-songs',
  imports: [ReactiveFormsModule],
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})
export class Songs {
formData!: FormGroup ;

constructor(){
  this.formData = new FormGroup({
    title: new FormControl(),
    coverUrl: new FormControl(),
    fileUrl: new FormControl(),
    releaseDate: new FormControl(),

  });
}
}
