import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DirectionsRenderer } from '@ngui/map';

import { RutasService } from '../../servicios/rutas.service';
import { FormControl } from '@angular/forms/src/model';
declare var $: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsResult: google.maps.DirectionsResult;
  direction: any = {
    origin: '',
    destination: '',
    travelMode: 'WALKING'
  };
  formulario: FormGroup;
  mensajeError: string;
  spinner: boolean;
  localId: string;

  mostrarFormulario: boolean;
  locales: Array<any>;
  localActual: any;

  constructor(
  private formBuilder:FormBuilder,
  public HttpService: HttpService,
  public ActivatedRoute: ActivatedRoute,
  public RutasService: RutasService,
  public Location: Location,
  private cdr: ChangeDetectorRef) {
    this.formulario = this.formBuilder.group({
      'localOrigen': [null, Validators.compose([Validators.required])],
      'localDestino': [null, Validators.compose([Validators.required])]
    });
    this.mensajeError = null;
    navigator.geolocation.getCurrentPosition(position => {
      this.direction.origin = position.coords.latitude + ',' + position.coords.longitude;
    });
  }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(parametros => {
      this.localId = parametros['id'];
      this.taerLocales();
    });
    this.directionsRendererDirective['initialized$'].subscribe( directionsRenderer => {
      this.directionsRenderer = directionsRenderer;
    });
  }

  taerLocales(){
    this.spinner = true;
    this.HttpService.leerTodos(this.RutasService.rutaAPI + "consultaLocales/")
    .then(datos => {
      this.spinner = false;
      this.locales = datos;
      this.obtenerLocalActual();
      this.direction.destination = this.localActual.direccion;
    })
    .catch(error => {
      console.log(error);
    });
  }

  obtenerLocalActual(){
    for (let index = 0; index < this.locales.length; index++) {
      if(this.locales[index].id == this.localId){
        this.localActual = this.locales[index];
      }
    }
  }

  mapear(){
    if(this.formulario.controls['localOrigen'].valid == false){
      this.mensajeError = 'El local origen es obligatorio';
      return;
    }
    else if(this.formulario.controls['localDestino'].valid == false){
      this.mensajeError = 'El local destino es obligatorio';
      return;
    }
    this.direction.origin = this.formulario.value.localOrigen;
    this.direction.destination = this.formulario.value.localDestino;
    this.showDirection();
  }

  directionsChanged() {
    this.directionsResult = this.directionsRenderer.getDirections();
    this.cdr.detectChanges();
  }

  showDirection() {
    this.directionsRendererDirective['showDirections'](this.direction);
  }
}