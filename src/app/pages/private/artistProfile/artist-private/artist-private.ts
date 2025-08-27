import { Component } from '@angular/core';
import { ArtistsServices } from '../../../../services/artists-services';
import { Albums } from '../../../../services/albums-services';
import { SongsServices } from '../../../../services/songs-services';
import { AuthServices } from '../../../../services/auth-services';

@Component({
  selector: 'app-artist-private',
  imports: [],
  templateUrl: './artist-private.html',
  styleUrl: './artist-private.css'
})
export class ArtistPrivate {
  artistData: any;
    albums: any[] = [];
    songs: any[] = [];
  
    constructor(
      private artistService: ArtistsServices,
      private albumService: Albums,
      private songService: SongsServices,
      private authService: AuthServices
    ) {}
  
    ngOnInit(): void {
      this.loadData();
    }
  
    loadData() {
      const userId = this.authService.getCurrentUser()?._id;
  
      this.artistService.getArtistByUserId(userId).subscribe((artist: any) => {
        this.artistData = artist;
      });
  
  
      this.albumService.getAlbumByArtistId(userId).subscribe((albums: any[]) => {
      this.albums = albums;
      });
  
      this.songService.getSongsByArtistId(userId).subscribe((songs: any[])=>{
        this.songs = songs;
      })
  
  
  
  
    }
}
