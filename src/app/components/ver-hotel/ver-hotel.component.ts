import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Entidad } from 'src/app/models/entidad.model';
import { Habitacion } from 'src/app/models/habitacion';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-hotel',
  templateUrl: './ver-hotel.component.html',
  styleUrls: ['./ver-hotel.component.css'],
  providers: [LoginService, UsuarioService],
})
export class VerHotelComponent implements OnInit {
  public getIdHotel: Entidad;
  public getIdCuartos: Habitacion;
  public getIdCuarto: Habitacion;

  public token;
  public dias: any;

  public precio: any;
  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) {
    this.getIdHotel = new Entidad(
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      0,
      0,
      0,
      0,
      ''
    );
    this.getIdCuartos = new Habitacion('', '', 0, true, '', 0, '', '');
    this.getIdCuarto = new Habitacion('', '', 0, true, '', 0, '', '');
    this.token = this._loginService.obtenerToken();
    this.dias = 0;
    this.precio = 0;
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getHotel(dataRuta.get('ID'));
    });
  }

  getHabitacion(idCuarto) {
    this._usuarioService.verHabitacion(idCuarto, this.token).subscribe({
      next: (response: any) => {
        this.getIdCuarto = response.Cuarto;
        this.precio = this.getIdCuarto.precio;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  cuartoOcupado() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Esta habitación se encuentra reservada.',
    });
  }

  pagarCuarto(precio, idCuarto,pagarCuarto) {
    this._usuarioService
      .pagarHabitacion(precio, idCuarto, this.token)
      .subscribe({
        next: (response: any) => {
          pagarCuarto.reset()
          Swal.fire({
            icon: 'success',
            title: 'Habitacion rentada.',
          });
          this._activatedRoute.paramMap.subscribe((dataRuta) => {
            this.getHotel(dataRuta.get('ID'));
          });
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: error.error.Error,
          });
        },
      });
  }

  getHotel(idHotel) {
    this._usuarioService.verHotel(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.getIdHotel = response.Hotel;
        this.getIdCuartos = response.habitaciones;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
