import { Component, OnInit } from '@angular/core';
import { RutasService } from '../../servicios/rutas.service';
declare var $: any;
@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  constructor(public RutasService: RutasService) { }

  ngOnInit() {
    $("#alerta").modal();
  }

}
