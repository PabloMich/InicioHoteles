import { Component, OnInit } from '@angular/core';
import { Habitacion } from 'src/app/models/habitacion';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css'],
  providers: [HotelService, LoginService],
})
export class HotelesComponent implements OnInit {
  public getModelo: Habitacion;
  public token;
  public postModelo: Habitacion;

  constructor(
    private _hotelService: HotelService,
    private _loginService: LoginService
  ) {
    this.postModelo = new Habitacion('', '', 0, true, '', 0, '');
    this.token = this._loginService.obtenerToken();
  }

  ngOnInit(): void {
    this.habitaciones();
  }

  habitaciones() {
    this._hotelService.verHabitaciones(this.token).subscribe({
      next: (response: any) => {
        this.getModelo = response.Mis_habitaciones;
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }
  postHabitacion(agregarCuarto) {
    this._hotelService
      .agregarHabitacion(this.postModelo, this.token)
      .subscribe({
        next: (response: any) => {
          this.habitaciones();
          agregarCuarto.reset();
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: error.error.Error,
          });
        },
      });
  }

  deleteHabitacion(idCuarto) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si eliminas a esta habitación, no la podrás recuperar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._hotelService.eliminarHabitacion(idCuarto, this.token).subscribe({
          next: (response: any) => {
            this.habitaciones();
            Swal.fire(
              '¡Eliminado!',
              'Has eliminado a esta habitación exitósamente',
              'success'
            );
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: error.error.Error,
            });
          },
        });
      }
    });
  }
}
