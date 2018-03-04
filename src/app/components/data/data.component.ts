import { Component } from '@angular/core';
// Para trabajar con formularios  y validaciones desde el data
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  // Responsable del manejo de la forma en su totalidad
  forma: FormGroup;

  usuario: Object = {
    nombrecompleto: {
      nombre: 'diego',
      apellido: 'guzman'
    },
    correo: 'difagume@gmail.com'//,
    //pasatiempos: ['correr', 'dormir', 'comer']
  };

  constructor() {

    console.log(this.usuario);


    this.forma = new FormGroup({

      'nombrecompleto': new FormGroup({

        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', Validators.required)

      }),

      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),

      'pasatiempos': new FormArray([
        new FormControl('correr', Validators.required)
      ])
    });

    // Para cargar la información al formulario
    // this.forma.setValue(this.usuario);

  }

  guardarCambios() {
    console.log('forma:', this.forma);
    console.log('valores:', this.forma.value);

    // Para resetear los campos (regresarlos al estado ng-pristine)

    // Opción 1
    this.forma.reset();

    // Opción 2
    /* this.forma.reset(
      {
        nombrecompleto: {
          nombre: 'fabricio',
          apellido: 'medrano'
        },
        correo: 'eldie@gmail.com'
      }
    ); */

    // Opción 3
    /* this.forma.controls['nombrecompleto'].get('nombre').setValue('diego fabricio');
    this.forma.controls['nombrecompleto'].get('apellido').setValue('guzmán medrano');
    this.forma.controls['correo'].setValue('diegofabrixio@gmail.com'); */

  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

}
