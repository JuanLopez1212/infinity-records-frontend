import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-form.html',
  styleUrl: './new-form.css'
})

export class SongsNewForm {

formData!: FormGroup ;

constructor(){
  this.formData = new FormGroup({
    title: new FormControl(),
    coverUrl: new FormControl(),
    fileUrl: new FormControl(),
    releaseDate: new FormControl(),

  });
}

onSubmit(){
  console.log(this.formData.value);
}
}


