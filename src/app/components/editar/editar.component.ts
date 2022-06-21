import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Entidad } from 'src/app/models/entidad.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [UsuarioService, LoginService],
})
export class EditarComponent implements OnInit {
  public getIdModelo: Entidad;

  public token;

  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) {
    this.getIdModelo = new Entidad('', '', '', '', '', '', 0, '', 0, 0, 0, 0);
    this.token = this._loginService.obtenerToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getPerfilId(dataRuta.get('ID'));
    });
  }

  getPerfilId(idPerfil) {
    this._usuarioService.perfilId(idPerfil, this.token).subscribe({
      next: (response: any) => {
        this.getIdModelo = response.Perfil;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  putPerfil() {
    this._usuarioService.editarPerfil(this.getIdModelo, this.token).subscribe({
      next: (response: any) => {
        if (this.getIdModelo.rol == 'HOTEL') {
          this._router.navigate(['/routerHotel/hoteles']);
        } else if (this.getIdModelo.rol == 'ADMIN') {
          this._router.navigate(['/principal/administracion']);
        } else if (this.getIdModelo.rol == 'USUARIO') {
          this._router.navigate(['/usuarios']);
        }
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }
}
