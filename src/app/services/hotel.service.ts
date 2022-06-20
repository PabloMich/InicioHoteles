import { Injectable } from '@angular/core'; //Inyecta los datos al servicio para que se puedan manejar
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  public identidad;

  constructor(public _http: HttpClient, public _loginService: LoginService) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  verHabitaciones(token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verHabitaciones/' + ID, {
      headers: headersToken,
    });
  }

  agregarHabitacion(modeloCuarto: Habitacion, token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloCuarto);
    return this._http.post(this.url + '/nuevoCuarto/' + ID, parametros, {
      headers: headersToken,
    });
  }

  eliminarHabitacion(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    var idHotel = this.identidad._id;

    return this._http.delete(this.url + '/borrarCuarto/' + id + '/' + idHotel, {
      headers: headersToken,
    });
  }
}
