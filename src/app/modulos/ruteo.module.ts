import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../servicios/auth.guard';

import { LoginComponent } from '../componentes/login/login.component';
import { InicialComponent } from '../componentes/inicial/inicial.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { RegistroAdminComponent } from '../componentes/registroAdmin/registroAdmin.component';
import { UsuarioComponent } from '../componentes/usuario/usuario.component';
import { UsuarioAdminComponent } from '../componentes/usuarioAdmin/usuarioAdmin.component';
import { AutorComponent } from '../componentes/autor/autor.component';
import { NominaComponent } from '../componentes/nomina/nomina.component';
import { RelevamientosEncargadoComponent } from '../componentes/relevamientos-encargado/relevamientos-encargado.component';
import { RelevamientosEmpleadoComponent } from '../componentes/relevamientos-empleado/relevamientos-empleado.component';
import { RelevamientosClienteComponent } from '../componentes/relevamientos-cliente/relevamientos-cliente.component';
import { AsignacionRelevamientoComponent } from '../componentes/asignacion-relevamiento/asignacion-relevamiento.component';
import { AsignacionRelevamientoReComponent } from '../componentes/asignacion-relevamiento-re/asignacion-relevamiento-re.component';
import { RelevamientoCompletarComponent } from '../componentes/relevamiento-completar/relevamiento-completar.component';
import { RelevamientoModificarComponent } from '../componentes/relevamiento-modificar/relevamiento-modificar.component';
import { RelevamientoVerComponent } from '../componentes/relevamiento-ver/relevamiento-ver.component';
import { MapaComponent } from '../componentes/mapa/mapa.component';
import { AlertaComponent } from '../componentes/alerta/alerta.component';
import { EncuestaComponent } from '../componentes/encuesta/encuesta.component';
import { EstadisticasComponent } from '../componentes/estadisticas/estadisticas.component';

const MiRuteo = [
  {path: '' , component: LoginComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: 'inicial' , component: InicialComponent, canActivate: [AuthGuard]},
  {path: 'registroAdmin' , component: RegistroAdminComponent, canActivate: [AuthGuard]},
  {path: 'autor' , component: AutorComponent},
  {path: 'usuario' , component: UsuarioComponent, canActivate: [AuthGuard]},
  {path: 'usuarioAdmin' , component: UsuarioAdminComponent, canActivate: [AuthGuard]},
  {path: 'nomina' , component: NominaComponent, canActivate: [AuthGuard]},
  {path: 'relevamientosEncargado' , component: RelevamientosEncargadoComponent, canActivate: [AuthGuard]},
  {path: 'relevamientosEmpleado' , component: RelevamientosEmpleadoComponent, canActivate: [AuthGuard]},
  {path: 'relevamientosCliente' , component: RelevamientosClienteComponent, canActivate: [AuthGuard]},
  {path: 'asignacionRelevamiento' , component: AsignacionRelevamientoComponent, canActivate: [AuthGuard]},
  {path: 'reasignacionRelevamiento/:id' , component: AsignacionRelevamientoReComponent, canActivate: [AuthGuard]},
  {path: 'relevamientoCompletar/:id' , component: RelevamientoCompletarComponent, canActivate: [AuthGuard]},
  {path: 'relevamientoModificar/:id' , component: RelevamientoModificarComponent, canActivate: [AuthGuard]},
  {path: 'relevamientoVer/:id' , component: RelevamientoVerComponent, canActivate: [AuthGuard]},
  {path: 'mapa/:id' , component: MapaComponent, canActivate: [AuthGuard]},
  {path: 'encuesta/:id' , component: EncuestaComponent, canActivate: [AuthGuard]},
  {path: 'estadisticas' , component: EstadisticasComponent, canActivate: [AuthGuard]},
  {path: 'alerta' , component: AlertaComponent},
  
  {path: 'error' , component: ErrorComponent},
  {path: '**' , component: ErrorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteoModule { }
