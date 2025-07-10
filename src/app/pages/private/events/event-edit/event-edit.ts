import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users';
import { EventsServices } from '../../../../services/events';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  imports: [ ReactiveFormsModule ],
  templateUrl: './event-edit.html',
  styleUrl: './event-edit.css'
})
export class EventEdit {
formData!: FormGroup;
    users: any = []
    selectedId!: string

    constructor(
        private userService: UsersService,
        private eventsServices: EventsServices,
        private router: Router,
        private activateRoute:ActivatedRoute

    ) {
        this.formData = new FormGroup({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            date: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required])
        });
    }

  formatDateToYMD(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // meses 0-11
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  

    onSubmit() {
        if (this.formData.valid) {
            console.log(this.formData.value)
            this.eventsServices.updateEvents(this.selectedId,this.formData.value).subscribe({
                next: (data) => {
                    console.log(data)
                    this.router.navigateByUrl('dashboard/events')
                },
                error: (error) => {
                    console.error(error)
                },
                complete: () => {
                }
            })
        }
    }


    ngOnInit() {
      this.activateRoute.params.subscribe({
        next:(data) => {
          console.log(data['id'])
          this.selectedId = data['id']
          this.eventsServices.getEventsbyId(data['id']).subscribe({
            next:(data)=>{
              console.log(data)
              this.formData.patchValue({
                title: data.title ,
                description: data.description ,
                date: this.formatDateToYMD(data.date) ,
                address: data.address
              })
            },
            error:(error) => {
              console.log(error);
            },
            complete: () => {}
          })
        },
        error:(error)=> {
          console.log(error);
        },
        complete: () => {

        }
      })
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

