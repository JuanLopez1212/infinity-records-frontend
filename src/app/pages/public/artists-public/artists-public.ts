import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsServices } from '../../../services/artists-services';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-artists',
  templateUrl: './artists-public.html',
  styleUrls: ['./artists-public.css']
})
export class ArtistsPublic {
  
  artists: any[] = [];
  items: any

  constructor(private artistService: ArtistsServices, private router: Router) {}

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData() {
    this.artistService.getArtists().subscribe({
      next: (data) => {
        this.artists = data;
      },
      error: (error: any) => {
        console.error('Error fetching artists:', error);
      } 
    });
  }

  navigateToArtistProfile(artistId: string) {
    console.log('Navegando a perfil del artista:', artistId);
    this.router.navigate(['/artistsProfile'], {
      state: { artistId: artistId }
    });
  }


  getItemClass(i: number): string {
    switch (i) {
      case 0: return 'item item-1';
      case 1: return 'item item-2';
      case 2: return 'item item-3';
      case 3: return 'item item-4';
      case 4: return 'item item-5';
      case 5: return 'item item-6';
      case 6: return 'item item-7';
      case 7: return 'item item-8';
      case 8: return 'item item-9';
      case 9: return 'item item-10';
      case 10: return 'item item-11';
      case 11: return 'item item-12';
      case 12: return 'item item-13';

      default: return 'item';
    }
  }

  
  next() {
    const first = this.artists.shift();
    if (first) {
      this.artists.push(first);
      this.artists = [...this.artists]; // 🧠 fuerza un nuevo array
      this.resetActiveIndex();      // 🔁 reinicia animación
      console.log(this.artists.map(i => i.title))
    }
  }
  
  prev() {
    const last = this.artists.pop();
    if (last) {
      this.artists.unshift(last);
      this.artists = [...this.artists]; // 🧠 mismo principio
      this.resetActiveIndex();
      console.log(this.artists.map(i => i.title))
    }
  }
  activeIndex = 1;

  resetActiveIndex() {
  this.activeIndex = -1;
  setTimeout(() => {
    this.activeIndex = 1;
  });
}
}
