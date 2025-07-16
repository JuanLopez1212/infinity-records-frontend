import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users';
import { EventsServices } from '../../../../services/events';

@Component({
  selector: 'app-event-new',
  imports: [ReactiveFormsModule],
  templateUrl: './event-new.html',
  styleUrl: './event-new.css'
})
export class EventNew {
    formData!: FormGroup;
    users: any = []

    constructor(
        private userService: UsersService,
        private EventsServices: EventsServices
    ) {
        this.formData = new FormGroup({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            date: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            image: new FormControl ('', [Validators.required])
        });
    }

    onSubmit() {
        console.log(this.formData.value)
        console.log(
            this.formData.valid,
            this.formData.invalid,
            this.formData.pristine,
            this.formData.dirty,
            this.formData.touched
        )

        if (this.formData.valid) {
            console.log(this.formData.value)
            this.EventsServices.registerEvents(this.formData.value).subscribe({
                next: (data) => {
                    console.log(data)
                },
                error: (error) => {
                    console.error(error)
                },
                complete: () => {
                    this.formData.reset() // Limpiamos los campos del formulario
                }
            })
        }
    }


    ngOnInit() {
        this.userService.getUsers().subscribe({
            next: (data) => {
                console.log(data)
                this.users = data
            },
            error: (error) => {
                console.log(error)
            },
            complete: () => {
                console.log('Complete')
            }
        })
    }
    ngOnDestroy() {
        console.log('ngOnDestroy');
    }
}
