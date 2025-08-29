import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistsServices } from '../../../../services/artists-services';
import { Router } from '@angular/router';
import { AuthServices } from '../../../../services/auth-services';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-artist-profile-edit',
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './artist-profile-edit.html',
  styleUrl: './artist-profile-edit.css'
})
export class ArtistProfileEdit {
  formData!: FormGroup;
  selectedId!: string;

  // Validador personalizado para URLs de imagen
  imageUrlValidator(control: any) {
    if (!control.value) return null;
    
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png)(\?.*)?$/i;
    return urlPattern.test(control.value) ? null : { invalidImageUrl: true };
  }

  constructor(
    private artistServices: ArtistsServices,
    private authServices: AuthServices,
    public router: Router
 
  ) {
    this.formData = new FormGroup({
      stageName: new FormControl('', [Validators.required]),
      bio: new FormControl('', [Validators.required]),
      genres: new FormControl('', [Validators.required]),
      profileImage: new FormControl('', [Validators.required, this.imageUrlValidator])
    });
  }

  onSubmit() {
    console.log('onSubmit called!');
    console.log('Raw form data:', this.formData.value);
    console.log('Form validity:', this.formData.valid);
    console.log('Form errors:', this.formData.errors);

    // Prevenir que el formulario se envíe automáticamente
    event?.preventDefault?.();

    if (this.formData.valid && this.selectedId) {
      // Preparar datos para enviar
      const dataToSend = {
        stageName: this.formData.get('stageName')?.value,
        bio: this.formData.get('bio')?.value,
        genres: this.formData.get('genres')?.value.split(',').map((g: string) => g.trim()),
        profileImage: this.formData.get('profileImage')?.value
      };

      console.log('Data to send:', dataToSend);
      console.log('Artist ID to update:', this.selectedId);

      this.artistServices.updateArtist(this.selectedId, dataToSend).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.router.navigateByUrl('/profilePrivate');
        },
        error: (error) => {
          console.error('Update failed:', error);
          console.error('Error details:', error.error);
        },
        complete: () => {
          console.log('Update request completed');
        }
      });
    } else {
      console.log('Form is invalid or no selectedId');
      console.log('selectedId:', this.selectedId);
      console.log('Form errors:', this.getFormErrors());
    }
  }

  getFormErrors() {
    const errors: any = {};
    Object.keys(this.formData.controls).forEach(key => {
      const control = this.formData.get(key);
      if (control && control.invalid) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  ngOnInit() {
    const userId = this.authServices.getCurrentUser()?._id;
    console.log('Current userId:', userId);
    
    if (userId) {
      // Primero obtener datos del artista por userId
      this.artistServices.getArtistByUserId(userId).subscribe({
        next: (data) => {
          console.log('Artist data loaded:', data);
          
          // Guardar el ID real del artista para updates
          this.selectedId = data._id || data.id;
          console.log('Artist ID for updates:', this.selectedId);
          
          // Cargar datos en el formulario
          this.formData.patchValue({
            stageName: data.stageName || data.name || '',
            bio: data.bio || data.description || '',
            genres: Array.isArray(data.genres) ? data.genres.join(', ') : (data.genres || ''),
            profileImage: data.profileImage || data.photo || ''
          });
          
          console.log('Form data after patch:', this.formData.value);
        },
        error: (error) => {
          console.error('Error loading artist data:', error);
        },
        complete: () => {}
      });
    }
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  goProfile(){
    this.router.navigateByUrl('/profilePrivate')
  }
}