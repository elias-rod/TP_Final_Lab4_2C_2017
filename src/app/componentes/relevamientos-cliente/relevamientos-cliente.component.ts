import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpService } from '../../servicios/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';

import { RutasService } from '../../servicios/rutas.service';
import { AuthGuard } from '../../servicios/auth.guard';

declare var jsPDF: any;
//declare var $: any;
import * as $ from 'jquery';
import * as autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-relevamientos-cliente',
  templateUrl: './relevamientos-cliente.component.html',
  styleUrls: ['./relevamientos-cliente.component.css']
})
export class RelevamientosClienteComponent implements OnInit {

  relevamientos: Array<any> = [];
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
      'momentoRealizacion': null,
      'mysteryNombre': null,
      'localNombre': null,
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
      for (let index = 0; index < datos.length; index++) {
        if(datos[index].momentoRealizacion !== '0'){
          this.relevamientos.push(datos[index]);
        }
      }
      this.copiaRelevamientos = this.relevamientos;
      //Restablece los ordenes
      for (var key in this.filtroForm.controls) {
        this.ordenes[key] = true;
      }
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

  downloadPdf() {
    var columns = [
      {title: "ID", dataKey: "id"},
      {title: "LOCAL", dataKey: "localNombre"},
      {title: "MYSTERY APELLIDO", dataKey: "mysteryApellido"},
      {title: "PUNTAJE", dataKey: "puntajePromedio"},
      {title: "NOTAS", dataKey: "notas"}
    ];    
    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, this.relevamientos, {
      styles: {fillColor: [100, 255, 255]},
      columnStyles: {
        id: {fillColor: 255}
      },
      margin: {top: 60},
      addPageContent: function(data) {
        doc.text("RELEVAMIENTOS", 250, 30);
      }
    });
    doc.save('table.pdf');
  }
}