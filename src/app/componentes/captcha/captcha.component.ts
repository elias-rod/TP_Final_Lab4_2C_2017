import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  formulario: FormGroup;
  solucion: any;
  respuesta: any;
  palabras: Array<string>;
  palabraMezclada: string;
  copiaSolucion: string;
  ultimaLetra: string;
  valido: boolean = false;
  @Output() seValido = new EventEmitter();

  constructor(
    private formBuilder:FormBuilder,
    public RutasService: RutasService) {
    this.formulario = this.formBuilder.group({
      'respuesta': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(6)])]
    });
    this.palabras = ['ORILLAS', 'PINTURAS', 'ANTIGUO', 'SUDAMERICA', 'REGISTRO', 'POBLACIONAL', 'CONTROLADO', 'REMONTA', 'ACUERDO', 'HALLAZGOS', 'RECOLECTORES', 'HABITARON', 'INSTALARON', 'SIERRAS', 'CORDOBA', 'DESPUES', 'MESOPOTAMIA', 'PRECOLOMBINA', 'UBICADA', 'HABITANTES', 'PRIMEROS', 'RASTROS', 'CORRESPONDEN', 'CULTURAL', 'PALEOLITICO', 'INCORPORARON', 'PRIMEROS', 'APORTES', 'CULTURALES', 'MESOLITICOS', 'NEOLITICOS', 'CONQUISTA', 'COLONIZACION', 'EUROPEA', 'OCUPADO', 'DIVERSOS', 'DIFERENTES', 'ORGANIZACIONES', 'SOCIALES', 'DIVIDIR', 'PRINCIPALES', 'ALIMENTOS', 'BASICOS', 'OCEANICOS', 'CANALES', 'FUEGUINOS', 'CAZADORES', 'AVANZADOS', 'CENTROESTE', 'PRADERAS', 'ESTEPAS', 'PAMPEANA', 'NORPATAGONICA', 'PATAGONIA', 'INVADIDOS', 'MAPUCHES', 'ALFAREROS', 'PROCEDENTES', 'CENTROSUR', 'TAMBIEN', 'PERTENECEN', 'INCORPORADO', 'CERAMICA', 'AGRICULTORES', 'CERAMICA', 'GUARANIES', 'CULTURAS', 'ANDINAS', 'DERIVADAS', 'SEGUNDO', 'MILENIO', 'CONOCIDO', 'GUARANIES', 'INVADIERON', 'LITORAL', 'ARGENTINO', 'CULTIVADORES', 'MANDIOCA', 'FLORESTAS', 'SEMISEDENTARIOS', 'CULTURAS', 'CENTRADAS', 'AGRICULTURA', 'GANADERIA', 'PURAMENTE', 'SEDENTARIAS', 'DESARROLLADO', 'COMERCIALES', 'ENGLOBADAS', 'CONJUNTO', 'ACTUALMENTE', 'LLAMADO', 'DIAGUITA', 'ESTABLECER', 'SISTEMA', 'LOCALES', 'SOMETIDOS', 'INCAICO', 'INFLUIDOS', 'CULTURAS', 'ANDINAS', 'PUEBLOS', 'DESARROLLARON', 'AGRICULTURA', 'GANADERIA', 'DESARROLLO', 'ADAPTADA', 'CONDICIONES', 'REGIONES', 'SERRANAS', 'ARGENTINA', 'INCAICO', 'CONQUISTO', 'ACTUALES', 'CATAMARCA', 'EXTREMO', 'PROVINCIA', 'TUCUMAN', 'PROVINCIAS', 'NOROESTE', 'MENDOZA', 'PROBABLEMENTE', 'SANTIAGO', 'INCORPORANDO', 'TRADICIONALMENTE', 'ATRIBUYE', 'MONARCA', 'YUPANQUI', 'ATACAMAS', 'DIAGUITAS', 'INTENTARON', 'RESISTIR', 'LOGRARON', 'DOMINARLOS', 'TRASLADANDO', 'TERRITORIOS', 'MITIMAES', 'COLONOS', 'DEPORTADOS', 'CHICHAS', 'SUROESTE', 'BOLIVIANO', 'POPULARMENTE', 'LLAMADOS', 'COMECHINGONES', 'RESISTIERON', 'INVASION', 'INCAICA', 'MANTUVIERON', 'INDEPENDIENTES', 'ARTICULO', 'CONQUISTA', 'LITOGRAFIA', 'COMIENZOS', 'IMPERIO', 'APROXIMADAMENTE', 'SOMETIENDO', 'ORIGINARIOS', 'HABITABAN', 'CONTINENTE', 'POBLACION', 'INDIGENA', 'MORTANDAD', 'PRODUJO', 'CATASTROFE', 'DEMOGRAFICA', 'CONQUISTADORES', 'EUROPEOS', 'INTRODUJERON', 'ESCLAVOS'];
    this.generarNuevo();
  }

  ngOnInit() {
  }

  generarSolucion(){
    this.solucion = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.copiaSolucion = this.solucion;
    this.palabraMezclada = this.copiaSolucion[0];
    this.copiaSolucion = this.copiaSolucion = this.copiaSolucion.substr(0, 0) + this.copiaSolucion.substr(0 + 1);
    this.ultimaLetra = this.copiaSolucion[this.copiaSolucion.length - 1];
    this.copiaSolucion = this.copiaSolucion.substr(0, this.copiaSolucion.length - 1);
    while (this.copiaSolucion.length > 0) {
      let posicionEliminar = Math.floor(Math.random() * this.copiaSolucion.length);
      this.palabraMezclada += this.copiaSolucion[posicionEliminar];
      this.copiaSolucion = this.copiaSolucion.substr(0, posicionEliminar) + this.copiaSolucion.substr(posicionEliminar + 1);
    }
    this.palabraMezclada += this.ultimaLetra;
    console.log('Solucion: ' + this.solucion);
  }

  generarNuevo() {
    this.generarSolucion();
    this.formulario.reset();
  }

  resetearFormulario() {
    this.formulario.reset();
    document.getElementById("respuestaInput").focus();
    (<HTMLInputElement>document.getElementById("respuestaInput")).disabled = false;
  }

  verificar() {
    this.respuesta = this.formulario.value.respuesta.toUpperCase();
    if(this.respuesta == this.solucion){
      this.seValido.emit();
      this.valido = true;
    }
  }
}