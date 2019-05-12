import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrearHospitalService {

  oculto: string = 'oculto';
  constructor() {  }

  mostrarModalCrearHospital() {
    this.oculto = '';
  }

  ocultarModalCrearHospital() {
    this.oculto = 'oculto';
    return;
  }
}
