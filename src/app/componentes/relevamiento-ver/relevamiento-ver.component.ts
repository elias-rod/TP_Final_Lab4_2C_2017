import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthGuard } from '../../servicios/auth.guard';
import { RutasService } from '../../servicios/rutas.service';
import { FormControl } from '@angular/forms/src/model';
declare var $: any;

@Component({
  selector: 'app-relevamiento-ver',
  templateUrl: './relevamiento-ver.component.html',
  styleUrls: ['./relevamiento-ver.component.css']
})
export class RelevamientoVerComponent implements OnInit {
  formulario: FormGroup;
  spinner: boolean;
  relevamientoId: string;
  relevamientoActual;
  Arr = Array; //Array type captured in a variable
  num: number;
  random: number;

  constructor(
  private formBuilder:FormBuilder,
  public HttpService: HttpService,
  public router: Router,
  public ActivatedRoute: ActivatedRoute,
  public RutasService: RutasService,
  public Location: Location,
  public AuthGuard: AuthGuard) {
    this.formulario = this.formBuilder.group({
      'puntajePromedio': [null, Validators.compose([Validators.required])],
      'notas': [null, Validators.compose([Validators.required, Validators.maxLength(1000), Validators.minLength(10)])]
    });
    this.random = Math.random();
  }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(parametros => {
      this.relevamientoId = parametros['id'];
      this.cargarFormulario();
    });
  }

  cargarFormulario(){
    this.AuthGuard.verificarVencimientoToken();
    this.spinner = true;
    this.HttpService.leer(this.RutasService.rutaAPI + "consultaRelevamientos/leer/", this.relevamientoId)
    .then(datos => {
      this.spinner = false;
      this.relevamientoActual = datos;
      this.formulario.patchValue(this.relevamientoActual);
    });
  }
}