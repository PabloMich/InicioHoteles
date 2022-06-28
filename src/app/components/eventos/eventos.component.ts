import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HotelService } from 'src/app/services/hotel.service';
import { Eventos } from 'src/app/models/eventos';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  providers: [LoginService, HotelService],
})
export class EventosComponent implements OnInit {
  public token;
  public getEventosModel: Eventos;
  public identidad;
  constructor(
    private _loginService: LoginService,
    private _hotelService: HotelService
  ) {
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos() {
    this._hotelService.misEventos(this.token).subscribe({
      next: (response: any) => {
        this.getEventosModel = response.Eventos;
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
