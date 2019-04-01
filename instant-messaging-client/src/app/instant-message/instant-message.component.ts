import { Component, Input } from '@angular/core';
import { InstantMessage } from '../instant-message';
import { Client } from '../client';
import { InstantMessagingService } from '../instant-messaging.service';

@Component({
  selector: 'app-instant-message',
  templateUrl: './instant-message.component.html',
  styleUrls: ['./instant-message.component.css']
})
export class InstantMessageComponent {

  username: string=null;
  @Input()
  message: InstantMessage;
  //client: Client;

  constructor(private service: InstantMessagingService) { this.username = this.service.getUsername(); }

  
  

  
  
}