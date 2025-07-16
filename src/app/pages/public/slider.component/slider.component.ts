import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SliderItem {
  img: string;
  title: string;
  description: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  items: SliderItem[] = [
    {
      img: 'https://img.cdndsgni.com/preview/10030831.jpg',
      title: '"Lossless Youths"',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
    },
    {
      img: 'https://elatlanticense.com/wp-content/uploads/2024/10/Carrusel-1-2-768x944.jpg',
      title: '"Estrange Bond"',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
    },
    {
      img: 'https://i.pinimg.com/originals/df/2b/3a/df2b3a3e54c442ebfcb7fe2b52dc765d.png',
      title: '"The Gate Keeper"',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
    },
    {
      img: 'https://i.pinimg.com/736x/78/6f/0a/786f0aa94670a59348f0e0cdcaebdce3.jpg',
      title: '"Last Trace Of Us"',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
    },
    {
      img: 'https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg',
      title: '"Urban Decay"',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
    },
    {
      img: 'https://da.se/app/uploads/2015/09/simon-december1994.jpg',
      title: '"The Migration"',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
    }
  ];


  getItemClass(i: number): string {
    switch (i) {
      case 0: return 'item item-1';
      case 1: return 'item item-2';
      case 2: return 'item item-3';
      case 3: return 'item item-4';
      case 4: return 'item item-5';
      case 5: return 'item item-6';
      default: return 'item';
    }
  }

  
  next() {
    const first = this.items.shift();
    if (first) {
      this.items.push(first);
      this.items = [...this.items]; // 🧠 fuerza un nuevo array
      this.resetActiveIndex();      // 🔁 reinicia animación
      console.log(this.items.map(i => i.title))
    }
  }
  
  prev() {
    const last = this.items.pop();
    if (last) {
      this.items.unshift(last);
      this.items = [...this.items]; // 🧠 mismo principio
      this.resetActiveIndex();
      console.log(this.items.map(i => i.title))
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

