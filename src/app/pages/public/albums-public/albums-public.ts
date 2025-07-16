import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Albums } from '../../../services/albums-services';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-songs',
  imports: [ReactiveFormsModule, RouterLink, DatePipe ],
  templateUrl: './albums-public.html',
  styleUrl: './albums-public.css'
})

export class AlbumsPublic {
  albums: any[] = [];

  @ViewChildren('albumCard', { read: ElementRef }) albumCards!: QueryList<ElementRef>;

  constructor(private albumService: Albums) {}

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData() {
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;

        setTimeout(() => {
          if (this.albumCards) {
            this.albumCards.changes.subscribe(() => {
              this.animateCards();
            });
            if (this.albumCards.length > 0) {
              this.animateCards();
            }
          }
        }, 0);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  animateCards() {
    if (!this.albumCards) return;

    this.albumCards.forEach((cardRef, index) => {
      const card = cardRef.nativeElement as HTMLElement;

      // Estado inicial
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';

      setTimeout(() => {
        card.style.transition = 'opacity 4s ease, transform 4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 * index);
    });
  }

  onDelete(id: string) {
    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.onLoadData();
        console.log ('id'+ id)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}