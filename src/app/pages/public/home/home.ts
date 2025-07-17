import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  @ViewChild('dots') dots!: ElementRef;
  @ViewChild('bgVideo') bgVideo!: ElementRef;

  currentSlide: number = 0;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const videoEl: HTMLVideoElement = this.bgVideo.nativeElement;
    videoEl.muted = true;
    videoEl.play().catch(err => {
      console.warn('El navegador bloqueó el autoplay:', err);
    });
    console.log('Carrusel inicializado')
    this.updateCarousel();
    setTimeout(() => this.updateCarousel(), 0);
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides()) % this.totalSlides();
    this.updateCarousel();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides();
    this.updateCarousel();
  }

  totalSlides(): number {
    if (!this.carouselTrack?.nativeElement) return 0;
    return this.carouselTrack.nativeElement.children.length;
  }

  updateCarousel(): void {
    const track = this.carouselTrack.nativeElement as HTMLElement;
    const slideWidth = track.children[0].clientWidth;

    const offset = -(this.currentSlide * slideWidth);
    this.renderer.setStyle(track, 'transform', `translateX(${offset}px)`);

    const dotsArr = this.dots.nativeElement.querySelectorAll('.dot');
    dotsArr.forEach((dot: any, index: number) => {
      if (index === this.currentSlide) {
        this.renderer.addClass(dot, 'active');
      } else {
        this.renderer.removeClass(dot, 'active');
      }
    });
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateCarousel();
  }
}