
import { Component, Input } from '@angular/core';
import { InstantMessage } from '../instant-message';
import { InstantMessagingService } from '../instant-messaging.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {

  constructor(private service: InstantMessagingService) { }// le service est automatiquement injecté 
  //au moment de la construction de l'instance de la classe private messages: InstantMessage[];
}