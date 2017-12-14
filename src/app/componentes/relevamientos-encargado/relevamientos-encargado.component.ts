import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpService } from '../../servicios/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';

import { RutasService } from '../../servicios/rutas.service';
import { AuthGuard } from '../../servicios/auth.guard';

declare var $: any;

@Component({
  selector: 'app-relevamientos-encargado',
  templateUrl: './relevamientos-encargado.component.html',
  styleUrls: ['./relevamientos-encargado.component.css']
})
export class RelevamientosEncargadoComponent implements OnInit {

  relevamientos: Array<any>;
  copiaRelevamientos: Array<any>;
  relevamientoActual: any;
  spinner: boolean;
  filtroForm: FormGroup;
  ordenes: object = {};

  constructor(
    public HttpService: HttpService,
    public RutasService: RutasService,
    private formBuilder:FormBuilder,
    public Router: Router,
    public AuthGuard: AuthGuard) {
    this.leerTodos();

    this.filtroForm = this.formBuilder.group({
      'momentoAsignacion': null,
      'momentoRealizacion': null,
      'localNombre': null,
      'mysteryNombre': null,
      'puntajePromedio': null
    });
  }

  ngOnInit() {
  }

  leerTodos(){
    this.AuthGuard.verificarVencimientoToken();
    this.spinner = true;
    this.HttpService.leerTodos(this.RutasService.rutaAPI + "consultaRelevamientos/")
    .then(datos => {
      this.spinner = false;
      this.relevamientos = this.copiaRelevamientos = datos;
      //Restablece los ordenes
      for (var key in this.filtroForm.controls) {
        this.ordenes[key] = true;
      }
      console.log(this.relevamientos)
    })
    .catch(error => {
      console.log(error);
    });
  }

  filtrar(columna){
    this.relevamientos = this.copiaRelevamientos.filter(
      function(objeto){
        if(objeto[columna].toString().toLowerCase().includes(this.filtroForm.controls[columna].value.toString().toLowerCase())){
          return true;
        }
        else{
          return false;
        }
      }, this
    );
  }

  ordenar(criterio){
    function comparacion(a,b){
      return a[criterio].toString().localeCompare(b[criterio].toString(), undefined, { numeric: true, sensitivity: 'base' });
    }
    if (this.ordenes[criterio]) {
      this.relevamientos = this.copiaRelevamientos.sort(comparacion);
    }
    else{
      this.relevamientos = this.copiaRelevamientos.sort(comparacion).reverse();
    }
    this.ordenes[criterio] = !this.ordenes[criterio];
  }

  eliminar(){
    var formData = new FormData();
    formData.append('id', this.relevamientoActual.id.toString());
    this.spinner = true;
    this.HttpService.post(this.RutasService.rutaAPI + "consultaRelevamientos/eliminar", formData)
    .then(datos => {
      this.spinner = false;
      if(datos == true){
        this.leerTodos();
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
}