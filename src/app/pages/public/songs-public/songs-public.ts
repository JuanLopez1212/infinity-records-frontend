import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-songs-public',
  imports: [CommonModule],
  templateUrl:'./songs-public.html',
  styleUrl: './songs-public.css'
})
export class SongsPublic {

  @ViewChild('eventCarrusel') carrusel!: ElementRef<HTMLDivElement>;
    scrollAmount: number = 300;
    eventCards: any[] = [];
  
    constructor(private http: HttpClient) {}
  
    ngAfterViewInit(): void {
      this.loadEvents();
    }
  
    loadEvents() {
      this.http.get<any[]>('http://localhost:3000/api/songs').subscribe({
        next: (data) => this.eventCards = data,
        error: (err) => console.error('Error cargando songs:', err)
      });
    }
  
    scrollLeft() {
      this.carrusel.nativeElement.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    }
  
    scrollRight() {
      this.carrusel.nativeElement.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    }
}

