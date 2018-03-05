import { Component } from '@angular/core';
// Para trabajar con formularios  y validaciones desde el data
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


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
    correo: 'difagume@gmail.com'// ,
    // pasatiempos: ['correr', 'dormir', 'comer']
  };

  constructor() {

    console.log(this.usuario);


    this.forma = new FormGroup({

      'nombrecompleto': new FormGroup({

        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [Validators.required, this.noHerrera])

      }),

      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),

      'pasatiempos': new FormArray([
        new FormControl('correr', Validators.required)
      ]),

      // Validador asíncrono del username
      'username': new FormControl('', Validators.required, this.existeUsername),

      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    this.forma.controls['password2'].setValidators([
      Validators.required, this.noIgual.bind(this.forma)
    ]);

    // Para cargar la información al formulario
    // this.forma.setValue(this.usuario);

  }

  guardarCambios() {
    console.log('forma:', this.forma);
    console.log('valores:', this.forma.value);

    // Para resetear los campos (regresarlos al estado ng-pristine)

    // Opción 1
    // this.forma.reset();

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

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'herrera') {
      return {
        noherrera: true
      };
    }
    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    const forma: any = this;
    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  existeUsername(control: FormControl): Promise<any> | Observable<any> {

    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {

          if (control.value === 'difagume') {
            resolve({ existe: true });
          } else { resolve(null); }

        }, 2000);
      }
    );
    return promesa;

  }

}
