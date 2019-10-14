import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  texto = '';

  constructor(public chatService: ChatService) { }

  ngOnInit() {
  }
  enviar() {
    console.log(this.texto);
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}