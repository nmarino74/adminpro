import { Component, OnInit } from '@angular/core';
import { CrearHospitalService, HospitalService, UsuarioService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: []
})
export class ModalComponent implements OnInit {

  hospital: Hospital;
  public oculto: string = '';
  constructor(public _creaHospitalService: CrearHospitalService,
    public _hospitalService: HospitalService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  mostrarModal() {
    this.oculto = '';
 }

  cerrarModal() {
    this._creaHospitalService.oculto = 'oculto';
  }

  guardarHospital(nombre: string) {
    const token = this._usuarioService.token;
    this._hospitalService.crearHospital(nombre).subscribe(resp => {
      this._creaHospitalService.ocultarModalCrearHospital();
    });
  }
}
