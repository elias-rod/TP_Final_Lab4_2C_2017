import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RecaptchaModule } from 'ng2-recaptcha';
import { NguiMapModule} from '@ngui/map';
import { ChartsModule } from 'ng2-charts';
//MODULOS PERSONALIZADOS
import { AuthModule } from './modulos/auth.module';
import { RuteoModule } from './modulos/ruteo.module';
//SERVICIOS
import { HttpService } from './servicios/http.service';
import { ActualizacionusuarioService } from './servicios/actualizacionusuario.service';
import { AuthGuard } from './servicios/auth.guard';
import { RutasService } from './servicios/rutas.service';
//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicialComponent } from './componentes/inicial/inicial.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RegistroAdminComponent } from './componentes/registroAdmin/registroAdmin.component';
import { ErrorComponent } from './componentes/error/error.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { UsuarioAdminComponent } from './componentes/usuarioAdmin/usuarioAdmin.component';
import { AutorComponent } from './componentes/autor/autor.component';
import { NominaComponent } from './componentes/nomina/nomina.component';
import { RelevamientosEncargadoComponent } from './componentes/relevamientos-encargado/relevamientos-encargado.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { AsignacionRelevamientoComponent } from './componentes/asignacion-relevamiento/asignacion-relevamiento.component';
import { RelevamientosEmpleadoComponent } from './componentes/relevamientos-empleado/relevamientos-empleado.component';
import { RelevamientosClienteComponent } from './componentes/relevamientos-cliente/relevamientos-cliente.component';
import { CaptchaComponent } from './componentes/captcha/captcha.component';
import { RelevamientoCompletarComponent } from './componentes/relevamiento-completar/relevamiento-completar.component';
import { RelevamientoVerComponent } from './componentes/relevamiento-ver/relevamiento-ver.component';
import { RelevamientoModificarComponent } from './componentes/relevamiento-modificar/relevamiento-modificar.component';
import { AsignacionRelevamientoReComponent } from './componentes/asignacion-relevamiento-re/asignacion-relevamiento-re.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { AlertaComponent } from './componentes/alerta/alerta.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    SpinnerComponent,
    LoginComponent,
    InicialComponent,
    RegistroComponent,
    RegistroAdminComponent,
    MenuComponent,
    UsuarioComponent,
    UsuarioAdminComponent,
    AutorComponent,
    NominaComponent,
    RelevamientosEncargadoComponent,
    FechaPipe,
    AsignacionRelevamientoComponent,
    RelevamientosEmpleadoComponent,
    RelevamientosClienteComponent,
    CaptchaComponent,
    RelevamientoCompletarComponent,
    RelevamientoVerComponent,
    RelevamientoModificarComponent,
    AsignacionRelevamientoReComponent,
    MapaComponent,
    AlertaComponent,
    EncuestaComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RuteoModule,
    HttpModule,
    AuthModule,
    ChartsModule,
    RecaptchaModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBUHx4bqg1yVT_KgjnLbeqlD40DUGSw57Q'})
  ],
  providers: [
    HttpService,
    AuthGuard,
    ActualizacionusuarioService,
    RutasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
