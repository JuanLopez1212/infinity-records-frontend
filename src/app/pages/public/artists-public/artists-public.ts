import { Component, signal, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-artists-public',
  imports: [],
  templateUrl: './artists-public.html',
  styleUrl: './artists-public.css'
})
export class ArtistsPublic {

  artistas = signal<any[]>([
    {
      username: 'Luar La L',
      img: 'img/luarlal.webp',
      genero: 'Trap'
    },
    {
      username: 'Bad Bunny',
      img: 'img/badbunny.webp',
      genero: 'Trap'
    },
    {
      username: 'Ryan Castro',
      img: 'img/ryancastro.webp',
      genero: 'Reggaeton'
    },
    {
      username: 'DFZM',
      img: 'img/dfzm.webp',
      genero: 'Reggaeton'
    },
    {
      username: 'Rels B',
      img: 'img/rels-b.webp',
      genero: 'Rap'
    },
    {
      username: 'Eladio Carrion',
      img: 'img/eladiocarrion.webp',
      genero: 'Trap'
    },
    {
      username: 'Lia Kali',
      img: 'img/liakali.webp',
      genero: 'Rap'
    },
    {
      username: 'Duki',
      img: 'img/duki.webp',
      genero: 'Trap'
    },
    {
      username: 'Rauw Alejandro',
      img: 'img/rauw.webp',
      genero: 'Reggaeton'
    }
  ]);

}

