import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SliderItem {
  profileImage: string;
  name: string;
  bio: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-artists',
  templateUrl: './artists-public.html',
  styleUrls: ['./artists-public.css']
})
export class ArtistsPublic {

  items: SliderItem[] = [
    {
      profileImage: 'https://i.pinimg.com/736x/81/6d/ec/816dec264e40bb367d8716df894586ed.jpg',
      name: '"Ryan Castro"',
      bio: 'El cantante del ghetto, papi. Yo soy Ryan Castro, directo desde el barrio Pedregal de Medellín. Vengo del pueblo, con hambre de gloria y corazón de calle. Mis letras no son inventadas, son vivencias. He tenido la bendición de cantar junto a Blessd, con Karol, y hasta compartir tarima con artistas duros como Bad Bunny. No vine a ser uno más, vine a poner a Colombia en el mapa musical, sin filtros, con estilo callejero y profesional.'
    },
    {
      profileImage: 'https://image.winudf.com/v2/image1/Y29tLmtpamEwMi5CYWRCdW5ueV9zY3JlZW5fNV8xNjY4ODkyMjkyXzAyOA/screen-5.jpg?fakeurl=1&type=.jpg',
      name: '"Bad Bunny "',
      bio: 'Yo soy Bad Bunny, el conejo malo, pero no por malo, sino por real. Vengo de Vega Baja, Puerto Rico, y transformé lo que sentía en música. No sigo tendencias, las creo. Hice trap cuando nadie creía, canté sobre emociones cuando todos hablaban de fronteo. He colaborado con los duros: Drake, Karol G, y artistas nuevos como Kris R o DFZM, porque el talento no tiene jerarquía. No me importa lo que digan, yo sigo siendo yo... Benito. Y eso es lo más real que tengo.'
    },
    {
      profileImage: 'https://wallpapers.com/images/hd/karol-g-celebrity-photography-xzdztbjft020lqgy.jpg',
      name: '"Karol G"',
      bio: 'Hey, yo soy Karol G, la Bichota, la que representa a las mujeres con fuerza, flow y corazón. Nací en Medellín, y desde niña soñé con cantar en grandes escenarios. No ha sido fácil, pero aprendí a convertir los no en gasolina. He trabajado con artistas que admiro como Bad Bunny y Drake, y me encanta apoyar talentos como Ryan Castro o Kris R. Cada canción que saco lleva parte de mi historia. Esto no es solo reggaetón, es empoderamiento real.'
    },
    {
      profileImage: 'https://i.pinimg.com/736x/37/13/e9/3713e9d79f834daf3863d8f05f448859.jpg',
      name: '"Drake"',
      bio: 'It’s Drizzy Drake. From Toronto to the world. I built my empire mixing soul, rap, R&B and emotions—real stories, my truth. I’ve linked with legends like Bad Bunny to blend cultures and sounds, because music speaks louder than borders. I respect the Latin wave, I ride with real talent like Karol G, DFZM, and Kris R. Im not just here to chart—Im here to inspire evolution.'
    },
    {
      profileImage: 'https://images.genius.com/6180ab96b6e1d86b6cc920e8b8367473.1000x1000x1.png',
      name: '"DFZM"',
      bio: 'Yo soy DFZM, el sonido que no puedes encasillar. Mi música nace de la oscuridad y la luz, de la calle y la galaxia. No soy ni trap ni reggaetón, soy todo lo que quieras escuchar cuando quieras sentir algo real. Colaborar con artistas como Bad Bunny, Kris R o Blessd me inspira porque todos venimos de lo mismo: de la lucha. No busco pegar, busco permanecer.'
    },
    {
      profileImage: 'https://akamai.sscdn.co/uploadfile/letras/fotos/5/d/6/d/5d6deecb5e429c8bef2ab9dcdb213dfd.jpg',
      name: '"Kris R"',
      bio: 'Mi nombre es Kris R, y lo mío no es moda, es destino. Cada verso mío tiene cicatrices, cada beat una historia. Soy fan del arte callejero, del sonido crudo y sincero. Me identifico con gente como DFZM, que no le teme al cambio, y respeto a los grandes como Karol G y Bad Bunny porque rompieron barreras sin perder esencia. No vine a copiar a nadie… vine a dejar mi huella.'
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
      console.log(this.items.map(i => i.name))
    }
  }
  
  prev() {
    const last = this.items.pop();
    if (last) {
      this.items.unshift(last);
      this.items = [...this.items]; // 🧠 mismo principio
      this.resetActiveIndex();
      console.log(this.items.map(i => i.name))
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

