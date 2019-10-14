import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  nombre: string = '';
  constructor(public wsService: WebsocketService, private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    this.wsService.loginWS(this.nombre).then(() => {
      swal('Ingresando al chat', '', 'success');
      this.router.navigate(['/mensajes']);
    });
  }
}
