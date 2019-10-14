import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styles: []
})
export class MensajesComponent implements OnInit {

  nombre: string;
  constructor(public wsService: WebsocketService) { }

  ngOnInit() {
    this.nombre = this.wsService.getUsuario().nombre;
  }

}
