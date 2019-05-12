import { Component, OnInit } from '@angular/core';
// import { HospitalService, UsuarioService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, CrearHospitalService, UsuarioService } from 'src/app/services/service.index';
import { map } from 'rxjs/internal/operators/map';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalHospitales: number;
  constructor(public _hospitalService: HospitalService,
    public _crearHospitalService: CrearHospitalService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
     this.cargarHospitales();
     this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    // this._hospitalService.cargarHospitales().subscribe((resp: any) => {
    //   console.log(resp);
    //   this.hospitales = resp.hospitales;
    //   this.totalHospitales = resp.total;
    // });
    this._hospitalService.cargarHospitales().subscribe(hospitales => this.hospitales = hospitales);
  }

  actualizarHospital(hospital: Hospital) {
    const token = this._usuarioService.token;
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(id: string) {
    let token = this._usuarioService.token;
    swal({
      title: 'Está seguro?',
      text: 'Está a punto de borrar el hospital ',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })
    .then( borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital(id).subscribe( resp => {
            console.log(resp);
            this.cargarHospitales();
         });
      }
    });
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      // content: 'input',
      icon: 'info',
      buttons: [true, true],
      dangerMode: true
    }).then((valor: string) => {
      if(!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor).subscribe(() => this.cargarHospitales());
    });
  }

  actualizarImagen( hospital: Hospital ) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }


  modalCrearHospital() {
    this._crearHospitalService.mostrarModalCrearHospital();
    this.cargarHospitales();
    // this._hospitalService.crearHospital(nombre);
  }

  buscarHospital(termino: string) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    return this._hospitalService.buscarHospital(termino).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

}
