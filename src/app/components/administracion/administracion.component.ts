import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { AdministracionService } from 'src/app/services/administracion.service';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [AdministracionService, LoginService],
})
export class AdministracionComponent implements OnInit {
  public getModelo: Entidad;
  public postModelo: Entidad;
  public getIdModelo: Entidad;
  public token;
  public identidad;

  constructor(
    private _adminService: AdministracionService,
    private _loginService: LoginService,
  ) {
    this.postModelo = new Entidad('', '', '', '', '', '', 0, '', 0,0,0,0,'');
    this.token = this._loginService.obtenerToken();
    this.identidad=JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this.hoteles();
  }

  hoteles() {
    this._adminService.hoteles(this.token).subscribe({
      next: (response: any) => {
        this.getModelo = response.Hoteles;
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  postHotel(agregarHotel) {
    this._adminService.nuevoHotel(this.postModelo, this.token).subscribe({
      next: (response: any) => {
        this.hoteles();
        agregarHotel.reset();
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  deleteHotel(idHotel) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si eliminas a este hotel, no lo podrás recuperar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._adminService.eliminarHotel(idHotel, this.token).subscribe({
          next: (response: any) => {
            this.hoteles();

            Swal.fire(
              '¡Eliminado!',
              'Has eliminado a este hotel exitósamente',
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
