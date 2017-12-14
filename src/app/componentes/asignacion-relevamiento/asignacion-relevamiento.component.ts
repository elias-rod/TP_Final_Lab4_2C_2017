import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms/src/model';

import { RutasService } from '../../servicios/rutas.service';
import { AuthGuard } from '../../servicios/auth.guard';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-asignacion-relevamiento',
  templateUrl: './asignacion-relevamiento.component.html',
  styleUrls: ['./asignacion-relevamiento.component.css']
})
export class AsignacionRelevamientoComponent implements OnInit {
  formulario: FormGroup;
  spinner: boolean;
  usuarios: Array<any> = [];
  locales: Array<any>;
  mensajeError: string;

  constructor(
  private formBuilder:FormBuilder,
  public HttpService: HttpService,
  private router: Router,
  public RutasService: RutasService,
  private Location: Location,
  public AuthGuard: AuthGuard) {
    this.formulario = this.formBuilder.group({
      'local': [null, Validators.compose([Validators.required])],
      'mysteryShopper': [null, Validators.compose([Validators.required])]
    });
    this.taerUsuarios();
    this.taerLocales();
    this.mensajeError = null;
  }

  ngOnInit() {}

  irAtras(){
    this.Location.back();
  }

  taerUsuarios(){
    this.AuthGuard.verificarVencimientoToken();
    this.spinner = true;
    this.HttpService.leerTodos(this.RutasService.rutaAPI + "consultaUsuarios/")
    .then(datos => {
      this.spinner = false;
      for (let index = 0; index < datos.length; index++) {
        if(datos[index].rol == 'empleado'){
          this.usuarios.push(datos[index]);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  taerLocales(){
    this.AuthGuard.verificarVencimientoToken();
    this.spinner = true;
    this.HttpService.leerTodos(this.RutasService.rutaAPI + "consultaLocales/")
    .then(datos => {
      this.spinner = false;
      this.locales = datos;
    })
    .catch(error => {
      console.log(error);
    });
  }

  crear(){
    if(this.formulario.controls['local'].valid == false){
      this.mensajeError = 'El local es obligatorio';
      return;
    }
    else if(this.formulario.controls['mysteryShopper'].valid == false){
      this.mensajeError = 'El mystery shopper es obligatorio';
      return;
    }
    this.AuthGuard.verificarVencimientoToken();
    var formData = new FormData();
    formData.append('localId', this.formulario.value.local);
    formData.append('mysteryShopperId', this.formulario.value.mysteryShopper);
    formData.append('encargadoId', JSON.parse(localStorage.getItem('usuarioActual')).id.toString());
    formData.append('momentoAsignacion', Date.now().toString());
    this.spinner = true;
    this.HttpService.post(this.RutasService.rutaAPI + "consultaRelevamientos/crear", formData)
    .then(datos => {
      this.spinner = false;
      if(datos == true){
        this.irAtras();
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
}