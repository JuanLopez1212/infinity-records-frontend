import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EventsServices {

    constructor(private http: HttpClient) { }


    // TODO: Revisar todo el flujo de la entidad Eventos
}