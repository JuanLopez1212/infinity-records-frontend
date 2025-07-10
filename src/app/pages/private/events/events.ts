import { Component, inject } from '@angular/core';
import { EventsServices } from '../../../services/events';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-events',
  imports: [RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events {
  events: any = [];
  getEvents: any;

  constructor ( private eventsService: EventsServices ) {}
  
  ngOnInit() {
    this.onLoadData()
  } 

  onLoadData(){
    this.eventsService.getEvents().subscribe ({
      next: ( data ) => {
        console.log ( data )
        this.events = data;
      },
      error: ( error ) => {
        console.error ( error )
      },
      complete: () => {}
    })
  }

onDelete(id: string){
  this.eventsService.deleteEvents(id).subscribe({
    next: ( data ) => {
        console.log ( data )
        this.onLoadData()
      },
      error: ( error ) => {
        console.error ( error )
      },
      complete: () => {}
  })
}

}
