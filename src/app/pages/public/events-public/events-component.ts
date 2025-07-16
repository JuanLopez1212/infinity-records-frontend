import { Component, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-events',
  templateUrl: './events-component.html',
  styleUrls: ['./events-component.css'],
  imports: [CommonModule, HttpClientModule] // 👈 AQUÍ SE ARREGLA TODO
})
export class EventsComponent implements AfterViewInit {
  

  @ViewChild('eventCarrusel') carrusel!: ElementRef<HTMLDivElement>;
  scrollAmount: number = 300;
  eventCards: any[] = [];

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<any[]>('http://localhost:3000/api/events').subscribe({
      next: (data) => this.eventCards = data,
      error: (err) => console.error('Error cargando eventos:', err)
    });
  }

  scrollLeft() {
    this.carrusel.nativeElement.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
  }

  scrollRight() {
    this.carrusel.nativeElement.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
  }
}

