import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-form.html',
  styleUrl: './new-form.css'
})
export class UserNewForm {
formData!: FormGroup;

  constructor() {
    this.formData = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      role: new FormControl()
    });
  }

  onSubmit(){
    console.log(this.formData.value);
  }
}
