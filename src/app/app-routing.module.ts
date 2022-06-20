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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'hoteles', component: HotelesComponent },
  { path: '', component: InicioComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'registrados', component: UsuariosRegistradosComponent },
  /*   {
    path: 'administracion',
    component: UsuariosRegistradosComponent,
    canActivate: [VerificacionGuard],
    children: [{ path: 'registrados', component: InicioComponent }],
  }, */
  { path: '**', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
