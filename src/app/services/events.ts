import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServices } from './auth-services';

@Injectable({
    providedIn: 'root'
})
export class EventsServices {

    constructor(
        private http: HttpClient,
        private authService: AuthServices
    ) { }
    registerEvents(newEvents: any) {
        return this.http.post<any>('http://localhost:3000/api/events', newEvents, { headers: this.authService.getHeaders() })
    }

    getEvents() {
        return this.http.get<any>('http://localhost:3000/api/events')
    }

    deleteEvents(id:string){
        return this.http.delete<any>('http://localhost:3000/api/events/'+id,{ headers: this.authService.getHeaders()})
    }

    updateEvents(id:string,updateEvents:any){
        return this.http.patch<any>('http://localhost:3000/api/events/'+id,updateEvents,{ headers: this.authService.getHeaders()})
    }

    getEventsbyId(id:string){
        return this.http.get<any>('http://localhost:3000/api/events/'+id,{headers:this.authService.getHeaders()})
    }

}