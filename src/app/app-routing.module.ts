import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { UsuariosRegistradosComponent } from './components/usuarios-registrados/usuarios-registrados.component';
import { VerificacionGuard } from './guards/verificacion.guard';
import { GraficaHotelesComponent } from './components/grafica-hoteles/grafica-hoteles.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { RouterHotelComponent } from './components/router-hotel/router-hotel.component';
import { VerificarHotelGuard } from './guards/verificar-hotel.guard';
import { EditarComponent } from './components/editar/editar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'usuarios', component: UsuariosComponent },
  {
    path: 'routerHotel',
    component: RouterHotelComponent,
    canActivate: [VerificarHotelGuard],
    children: [
      { path: 'hoteles', component: HotelesComponent },
      { path: 'eventos', component: EventosComponent },
      { path: 'editar/:ID', component: EditarComponent },
    ],
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'principal',
    component: PruebaComponent,
    canActivate: [VerificacionGuard],
    children: [
      { path: 'administracion', component: AdministracionComponent },
      { path: 'registrados', component: UsuariosRegistradosComponent },
      { path: 'solicitados', component: GraficaHotelesComponent },
      { path: 'editar/:ID', component: EditarComponent },
    ],
  },

  { path: '**', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
