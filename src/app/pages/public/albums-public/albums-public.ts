import { Component, ElementRef, ViewChildren, ViewChild, QueryList, AfterViewInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Albums } from '../../../services/albums-services';
import { DatePipe} from '@angular/common';


@Component({
  selector: 'app-songs',
  imports: [ReactiveFormsModule, DatePipe ],
  templateUrl: './albums-public.html',
  styleUrl: './albums-public.css'
})

export class AlbumsPublic {
  albums: any[] = [];

  @ViewChildren('newsCard', { read: ElementRef }) newsCards!: QueryList<ElementRef>;
  @ViewChildren('albumCard', { read: ElementRef }) albumCards!: QueryList<ElementRef>;



  constructor(private albumService: Albums) {}

  ngOnInit() {
    this.onLoadData();
  }

  ngAfterViewInit(): void {
  if (this.newsCards) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('animated-fade-in');
          observer.unobserve(element); // Solo una vez
        }
      });
    }, {
      threshold: 0.2 // Se activa cuando el 20% del elemento es visible
    });

    this.newsCards.forEach((cardRef) => {
      const card = cardRef.nativeElement as HTMLElement;
      observer.observe(card);
    });
  }
}

  // ngAfterViewInit(): void {
  //   this.setupScrollAnimation();
  // }

  // private setupScrollAnimation(): void {
  //   const body = document.body;
  //   const html = document.documentElement;

  //   const scrollFunction = (k: number) => {
  //     if (Math.abs(k) > 0.5) {
  //       const total = html.offsetHeight - window.innerHeight;
  //       const scrollY = 0.5 * (k - Math.sign(k) + 1) * total;
  //       window.scrollTo(0, scrollY);
  //     }
  //   };

  //   scrollFunction(-1);

  //   window.addEventListener('scroll', () => {
  //     const computed = getComputedStyle(body);
  //     const k = parseFloat(computed.getPropertyValue('--k'));
  //     if (!isNaN(k)) {
  //       scrollFunction(k);
  //     }
  //   });
  // }


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

    // Limpia la clase por si ya se aplicó antes
    card.classList.remove('animated-fade-in');

    setTimeout(() => {
      card.classList.add('animated-fade-in');
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