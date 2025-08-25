import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Artist {
  _id: string;
  name: string;
  profileImage?: string;
  genres?: string[];
  genresText?: string;
}

interface Event {
  _id: string;
  title: string;
  description?: string;
  date: string;
  address?: string;
  userId: string;
  image?: string;
}

interface Song {
  _id: string;
  title: string;
  coverUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  @ViewChild('artistCarousel') artistCarousel!: ElementRef;
  @ViewChild('eventCarousel') eventCarousel!: ElementRef;
  @ViewChild('songsCarousel') songsCarousel!: ElementRef;

  artists: Artist[] = [];
  events: Event[] = [];
  songs: Song[] = [];
prevSlide: any;
nextSlide: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadArtists();
    this.loadEvents();
    this.loadSongs();
  }

  // ARTISTS
  loadArtists(): void {
    this.http.get<Artist[]>('http://localhost:3000/api/artists').subscribe({
      next: (data) => {
        this.artists = data.map(artist => ({
          ...artist,
          profileImage: artist.profileImage?.startsWith('http')
            ? artist.profileImage
            : `http://localhost:3000${artist.profileImage || ''}`,
          genresText: artist.genres?.length
            ? artist.genres.join(', ')
            : 'Género no especificado'
        }));
      },
      error: (err) => console.error('Error cargando artistas', err)
    });
  }

  prevSlideArtists(): void {
    this.artistCarousel?.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  nextSlideArtists(): void {
    this.artistCarousel?.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  // EVENTS
  loadEvents(): void {
    this.http.get<Event[]>('http://localhost:3000/api/events').subscribe({
      next: (data) => {
        this.events = data.map(event => ({
          ...event,
          image: event.image?.startsWith('http')
            ? event.image
            : `http://localhost:3000${event.image || ''}`
        }));
      },
      error: (err) => console.error('Error cargando eventos', err)
    });
  }

  prevSlideEvents(): void {
    this.eventCarousel?.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  nextSlideEvents(): void {
    this.eventCarousel?.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  // SONGS
  loadSongs(): void {
    this.http.get<Song[]>('http://localhost:3000/api/songs').subscribe({
      next: (data) => {
        this.songs = data.map(song => ({
          ...song,
          coverUrl: song.coverUrl?.startsWith('http')
            ? song.coverUrl
            : `http://localhost:3000${song.coverUrl || ''}`
        }));
      },
      error: (err) => console.error('Error cargando canciones', err)
    });
  }

  prevSlideSongs(): void {
    this.songsCarousel?.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  nextSlideSongs(): void {
    this.songsCarousel?.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}


