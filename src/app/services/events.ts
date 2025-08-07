import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServices } from './auth-services';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventsServices {
    BASE_URL: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private authService: AuthServices
    ) { 
        
    }
    registerEvents(newEvents: any) {
        return this.http.post<any>(`${this.BASE_URL}/events`, newEvents, { headers: this.authService.getHeaders() })
    }

    getEvents() {
        return this.http.get<any>(`${this.BASE_URL}/events`)
    }

    deleteEvents(id:string){
        return this.http.delete<any>(`${this.BASE_URL}/events/`+id,{ headers: this.authService.getHeaders()})
    }

    updateEvents(id:string,updateEvents:any){
        return this.http.patch<any>(`${this.BASE_URL}/events/`+id,updateEvents,{ headers: this.authService.getHeaders()})
    }

    getEventsbyId(id:string){
        return this.http.get<any>(`${this.BASE_URL}/events/`+id,{headers:this.authService.getHeaders()})
    }

}