import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RutasService } from '../../servicios/rutas.service';
import { FormControl } from '@angular/forms/src/model';
declare var $: any;

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  formulario: FormGroup;
  mensajeError: string;
  spinner: boolean;
  relevamientoId: string;
  puntuacion: string[] = ['bueno', 'medio', 'malo'];

  constructor(
  private formBuilder:FormBuilder,
  public HttpService: HttpService,
  public router: Router,
  public ActivatedRoute: ActivatedRoute,
  public RutasService: RutasService,
  public Location: Location) {
    this.formulario = this.formBuilder.group({
      'satisfaccionGlobal': [null, Validators.compose([Validators.required])],
      'satisfaccionMysteryShopper': [null, Validators.compose([Validators.required])],
      'satisfaccionNotas': [null, Validators.compose([Validators.required])],
      'satisfaccionFotos': [null, Validators.compose([Validators.required])],
      'recomendacionGeneral': [null, Validators.compose([Validators.required])],
      'recomendacionMysteryShopper': [null, Validators.compose([Validators.required])],
      'concordanciaPromedio': [null, Validators.compose([Validators.required])]
    });
    this.mensajeError = null;
  }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(parametros => {
      this.relevamientoId = parametros['id'];
    });
  }

  enviar(){
    if(this.formulario.invalid){
      this.mensajeError = 'Todas las preguntas son obligatorias';
      return;
    }
    var formData = new FormData();
    formData.append('relevamientoId', this.relevamientoId);
    formData.append('satisfaccionGlobal', this.formulario.value.satisfaccionGlobal);
    formData.append('satisfaccionMShopper', this.formulario.value.satisfaccionMysteryShopper);
    formData.append('satisfaccionNotas', this.formulario.value.satisfaccionNotas);
    formData.append('satisfaccionFotos', this.formulario.value.satisfaccionFotos);
    formData.append('recomendariaServicio', this.formulario.value.recomendacionGeneral);
    formData.append('recomendariaMShopper', this.formulario.value.recomendacionMysteryShopper);
    formData.append('concuerdaPuntajePromedio', this.formulario.value.concordanciaPromedio);

    this.spinner = true;
    this.HttpService.post(this.RutasService.rutaAPI + "consultaEncuestas/crear", formData)
    .then(datos => {
      this.spinner = false;
      if(datos == true){
        this.router.navigate(['relevamientosCliente']);
      }
      this.mensajeError = datos.error;
    })
    .catch(error => {
      console.log(error);
    });
  }
}