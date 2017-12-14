import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RutasService } from '../../servicios/rutas.service';
import { FormControl } from '@angular/forms/src/model';
declare var $: any;

@Component({
  selector: 'app-relevamiento-completar',
  templateUrl: './relevamiento-completar.component.html',
  styleUrls: ['./relevamiento-completar.component.css']
})
export class RelevamientoCompletarComponent implements OnInit {
  formulario: FormGroup;
  mensajeError: string;
  spinner: boolean;
  captchaValido: boolean = false;
  relevamientoId: string;
  archivos: any[] = [];
  fileReaders: any[] = [];

  constructor(
  private formBuilder:FormBuilder,
  public HttpService: HttpService,
  public router: Router,
  public ActivatedRoute: ActivatedRoute,
  public RutasService: RutasService,
  public Location: Location) {
    this.formulario = this.formBuilder.group({
      'puntajePromedio': [null, Validators.compose([Validators.required])],
      'notas': [null, Validators.compose([Validators.required, Validators.maxLength(1000), Validators.minLength(10)])]
    });
    this.mensajeError = null;
  }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(parametros => {
      this.relevamientoId = parametros['id'];
    });
  }

  previsualizarFoto(){
    //OBTENCION DE LA FOTO SELECCIONADA
    this.archivos = $('#selectorFoto')[0].files;
    //VERIFICACION DE VALIDACION
    if(!this.validarFoto()){
      //////////////////$("#fotoPrevia").attr('src', null);
      return;
    }
    for (let index = 0; index < this.archivos.length; index++) {
      //1)CREACION DEL OBJETO QUE LEE EL ARCHIVO
      this.fileReaders.push(new FileReader());
      //3)SETEO DE LA FUNCION QUE SE EJECUTARA AL FINALIZAR LA LECTURA
      this.fileReaders[index].onload = () => {
        $("#foto"+index).attr('src', this.fileReaders[index].result);
      }
      //2)LECTURA DEL ARCHIVO Y ALMACENAMIENTO COMO URL EN LA PROPIEDAD "RESULT"
      this.fileReaders[index].readAsDataURL($('#selectorFoto')[0].files[index]);
    }
  }
  //VALIDACION DE FOTO PREVISUALIZADA EN EXTENSION Y TAMAÑO
  validarFoto(){
    //EXPRESION REGULAR QUE EVALUA LA PRESENCIA DE CUALQUIERA DE LOS FORMATOS ACEPTADOS
    var re = /(\.jpg|\.jpeg|\.png|\.bmp|\.gif)$/i;
    for (let index = 0; index < this.archivos.length; index++) {
      //VERIFICACION DEL TIPO DE ARCHIVO
      if(!re.exec(this.archivos[index].name))
      {
        this.mensajeError = "Cambie la imagen, sólo se permiten imágenes con extensión .jpg .jpeg .bmp .gif o .png";
        return false;
      }
      //VERIFICACION DEL TAMAÑO DEL ARCHIVO
      if(this.archivos[index].size > (9 /*1MB*/ * 1024 * 1024)) {//La propiedad size devuelve el tamaño en bytes. Multiplicacion de los mb deseados por 1024 para convertir a bytes
        this.mensajeError = "Cambie la imagen, solo se permiten tamaños imagenes de tamaño inferior a 1 MB";
        return false;
      }
    }
    return true;
  }

  registrar(){
    if(this.formulario.controls['puntajePromedio'].valid == false){
      this.mensajeError = 'El puntaje es obligatorio';
      return;
    }
    else if(this.formulario.controls['notas'].valid == false){
      this.mensajeError = 'La nota es obligatoria y debe ser de 10 a 1000 caracteres';
      return;
    }
    else if($("#selectorFoto").val() == ''){
      this.mensajeError = 'Debe seleccionar una foto';
      return;
    }
    else if(!this.captchaValido){
      this.mensajeError = 'El captcha es obligatorio';
      return;
    }
    var formData = new FormData();
    formData.append('id', this.relevamientoId);
    for (let index = 0; index < this.archivos.length; index++) {
      formData.append('foto'+index, this.archivos[index]);
    }
    formData.append('cantidadFotos', this.archivos.length.toString());
    formData.append('momentoRealizacion', Date.now().toString());
    formData.append('puntajePromedio', this.formulario.value.puntajePromedio);
    formData.append('notas', this.formulario.value.notas);

    this.spinner = true;
    this.HttpService.post(this.RutasService.rutaAPI + "consultaRelevamientos/actualizar", formData)
    .then(datos => {
      this.spinner = false;
      if(datos == true){
        this.Location.back();
      }
      this.mensajeError = datos.error;
    })
    .catch(error => {
      console.log(error);
    });
  }
}