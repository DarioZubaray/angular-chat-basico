import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket) {
    this.cargarStorage();
    this.checkStatus();
   }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emitir(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent( evento );
  }

  loginWS(nombre: string) {
    return new Promise( (resolve, reject) => {
      this.emitir('configurar-usuario', {nombre}, (resp) => {
        if (resp.ok) {
          this.usuario = new Usuario(nombre);
          this.guardarStorage();
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }
}

