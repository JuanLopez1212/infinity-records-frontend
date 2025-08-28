import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistsServices } from '../../../services/artists-services';
import { Albums } from '../../../services/albums-services';
import { SongsServices } from '../../../services/songs-services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-artist-public',
  imports: [ DatePipe ],
  templateUrl: './artists.html',
  styleUrls: ['./artists.css']
})
export class ArtistPublic implements OnInit {
  artistData: any;
  albums: any[] = [];
  songs: any[] = [];
  selectedArtistId: string = '';
  isLoading: boolean = true;

  constructor(
    private artistService: ArtistsServices,
    private albumService: Albums,
    private songService: SongsServices,
    private router: Router
  ) {
    // Capturar el ID del artista desde el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.selectedArtistId = navigation.extras.state['artistId'];
    }
    
    // También intentar obtener desde el historial del navegador si no se encuentra
    if (!this.selectedArtistId) {
      const state = window.history.state;
      if (state && state.artistId) {
        this.selectedArtistId = state.artistId;
      }
    }
  }

  ngOnInit(): void {
    if (this.selectedArtistId) {
      console.log('Artist ID encontrado:', this.selectedArtistId);
      this.loadData();
    } else {
      console.error('No se encontró ID del artista');
      console.log('Estado de navegación:', this.router.getCurrentNavigation());
      console.log('Estado del historial:', window.history.state);
      this.isLoading = false;
    }
  }

  loadData() {
    console.log('Cargando datos para artista ID:', this.selectedArtistId);
    this.isLoading = true;

    // Obtener datos del artista por ID (este método no requiere auth)
    this.artistService.getArtistById(this.selectedArtistId).subscribe({
      next: (artist: any) => {
        console.log('Datos del artista recibidos:', artist);
        this.artistData = artist;
        this.isLoading = false;
        
        // Una vez que tenemos los datos del artista, cargar álbumes y canciones
        this.loadAlbumsAndSongs();
      },
      error: (error) => {
        console.error('Error al cargar datos del artista:', error);
        this.isLoading = false;
      }
    });
  }

  loadAlbumsAndSongs() {
  const userId = this.artistData.userId?._id || this.artistData.userId;
  
  // Usar métodos públicos directos
  this.albumService.getPublicAlbumsByArtistId(userId).subscribe({
    next: (albums) => {
      this.albums = albums;
      console.log('Álbumes encontrados:', albums.length);
    },
    error: (error) => console.error('Error:', error)
  });

  this.songService.getPublicSongsByArtistId(userId).subscribe({
    next: (songs) => {
      this.songs = songs;  
      console.log('Canciones encontradas:', songs.length);
    },
    error: (error) => console.error('Error:', error)
  });
}

  goBack() {
    this.router.navigate(['/artists']); // Regresar a la lista de artistas
  }
}