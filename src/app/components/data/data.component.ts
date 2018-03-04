import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Para trabajar con formularios  y validaciones desde el data


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  // Responsable del manejo de la forma en su totalidad
  forma: FormGroup;

  constructor() {
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl('', Validators.required),
      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    });
  }

  guardarCambios() {
    console.log('forma:', this.forma);
    console.log('valores:', this.forma.value);
  }

}
