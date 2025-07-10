import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersServices } from '../../../../services/users-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Albums } from '../../../../services/albums';

@Component({
  selector: 'app-album-edit',
  imports: [ ReactiveFormsModule ],
  templateUrl: './album-edit.html',
  styleUrl: './album-edit.css'
})
export class AlbumEdit {
  formData!: FormGroup;
  users: any = [];
  selectedId!: string;

  constructor(
    private userService: UsersServices,
    private albumService: Albums,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formData = new FormGroup({
      title: new FormControl('', [Validators.required]),
      cover_url: new FormControl('', [Validators.required]),
      date_release: new FormControl('', [Validators.required]),
    });
  }

  formatDateToYMD(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // meses 0-11
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    console.log(this.formData.value);
    console.log(
      this.formData.valid,
      this.formData.invalid,
      this.formData.pristine,
      this.formData.dirty,
      this.formData.touched
    );

    if (this.formData.valid) {
      console.log(this.formData.value);

      this.albumService.updateAlbum( this.selectedId, this.formData.value ).subscribe({
        next: ( data ) => {
          console.log ( data )
          this.router.navigateByUrl ( 'dashboard/albums' )
        },
        error: ( error ) => {
          console.error ( error )
        },
        complete: () => {}
      })
    }
  }



  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: ( data ) => {
        console.log( data['id'] );
        this.selectedId = data['id']
        this.albumService.getAlbumById( data['id'] ).subscribe({
          next: ( data ) => {
            console.log ( data )
            console.log ( this.formatDateToYMD( data.date_release ) )
            this.formData.patchValue({
              title: data.title,
              cover_url: data.cover_url,
              date_release: this.formatDateToYMD( data.date_release )
            });
          },
          error: ( error ) => {
            console.error ( error )
          },
          complete: () => {}
        })
      },
      error: (error) => {
        console.error ( error );
      },
      complete: () => {},
    });
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
