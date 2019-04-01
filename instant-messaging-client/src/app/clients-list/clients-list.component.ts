import { Component, Input} from '@angular/core';
import { InstantMessagingService } from '../instant-messaging.service';

import { Client } from '../client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent {
  @Input()
  
  client: Client;
  constructor(private service: InstantMessagingService) { }

}
