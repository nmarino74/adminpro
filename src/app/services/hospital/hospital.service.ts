import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
// import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;
  hospital: Hospital;
  constructor(public http: HttpClient, public _usuarioService: UsuarioService ) { }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url).pipe(map((resp: any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }


  crearHospital( nombre: string ) {
    // this.hospital = new Hospital(nombre);
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre}).pipe(map((resp: any) => {
      swal('Hospital creado', resp.hospital.nombre, 'success');
      return true;
    }));

    // return this.http.post(url, {nombre}).pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(map(resp => swal('Hospital Borrado', 'Eliminado correctamente', 'success')));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital).pipe(map((resp: any) => {
      swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
    }));
    // return this.http.post(url, hospital).pipe(map((resp: any) => resp.hospital));
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url);
    // return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }
}
