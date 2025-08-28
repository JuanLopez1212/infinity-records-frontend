import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArtistsServices } from '../../../../services/artists-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-profile-edit',
  imports: [],
  templateUrl: './artist-profile-edit.html',
  styleUrl: './artist-profile-edit.css'
})
export class ArtistProfileEdit {
formData!: FormGroup;

constructor(
  private artistServices : ArtistsServices,
  private router: Router
  ){
    
  }
}


