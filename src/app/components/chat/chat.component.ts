import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajeSubscription: Subscription;
  mensajes: any[] = [];
  chatMensajes: HTMLElement;

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.chatMensajes = document.getElementById('chat-mensajes');
    this.mensajeSubscription = this.chatService.getMessages().subscribe(msg => {
      console.log(msg);
      this.mensajes.push(msg);

      setTimeout( ()=> {
        this.chatMensajes.scrollTop = this.chatMensajes.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }

  enviar() {
    if (this.texto == '') {
      return;
    }
    console.log(this.texto);
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
