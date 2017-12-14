import { Component, OnInit } from '@angular/core';
import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {
  usuarioActual: any;
  
  constructor(public RutasService: RutasService) {
    this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
  }

  ngOnInit() {
  }

}
