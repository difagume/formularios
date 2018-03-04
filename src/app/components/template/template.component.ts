import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent {

  public usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    genero: 'Hombre',
    acepta: false
  };

  paises = [{
    codigo: 'CRI',
    nombre: 'Costa Rica'
  },
  {
    codigo: 'ESP',
    nombre: 'España'
  },
  {
    codigo: 'EC',
    nombre: 'Ecuador'
  }];

  generos: String[] = ['Hombre', 'Mujer', 'Sin definir'];

  constructor() { }

  guardar(forma: NgForm) {
    console.log('ngForm:', forma);
    console.log('valor forma:', forma.value);
    console.log('usuario:', this.usuario);

  }

}
