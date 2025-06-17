import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Albums } from '../../albums/albums';

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
    title: new FormControl('', [Validators.required]),
    coverUrl: new FormControl('', [Validators.required]),
    fileUrl: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [Validators.required]),
    

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
  }

  this.formData.reset() // limpiamos los campos del formulario
}



}


