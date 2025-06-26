import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-events',
  imports: [ReactiveFormsModule],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events {
// TODO: Revisar todo el flujo de la entidad Eventos
  // formData!: FormGroup;
  // users: any = [];


  // constructor(private usersservices: UsersServices) {
  //   this.formData = new FormGroup({
  //     title: new FormControl('', [Validators.required]),
  //     description: new FormControl('', [Validators.required]),
  //     date: new FormControl('', [Validators.required]),
  //     address: new FormControl('', [Validators.required]),
  //   });
  // }


  // onSubmit() {
  //   console.log(
  //     this.formData.valid,
  //     this.formData.invalid,
  //     this.formData.pristine,
  //     this.formData.dirty,
  //     this.formData.touched
  //   );

  //   if (this.formData.valid) {
  //     console.log(this.formData.value);
  //   }

  //   if (this.formData.valid) {

  //     console.log(this.formData.value);
  //   }

  //   this.formData.reset() // limpiamos los campos del formulario
  // }

  // ngOnInit() {
  //   this.usersservices.getUsers().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.users = data;
  //     },
  //     error: (error) => {
  //       console.log(error)
  //     },
  //     complete: () => {
  //       console.log('Complete')
  //     }
  //   })
  // }
  // ngOnDestroy() {
  //   console.log('ngOnDestroy');
  // }

}