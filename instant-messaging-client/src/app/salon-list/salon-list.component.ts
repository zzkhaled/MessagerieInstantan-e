import { Component, OnInit } from '@angular/core';
import {SalonDiscussion} from '../salon-discussion';
import { InstantMessagingService } from '../instant-messaging.service';



@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.component.html',
  styleUrls: ['./salon-list.component.css']
})
export class SalonListComponent implements OnInit {

  salons : SalonDiscussion []= [{ id: 1, name: 'CCI Général' }, { id: 2, name: 'CCI Sport' },
  { id: 3, name: 'CCI Cinéma' }, { id: 4, name: 'CCI Politique' }];
  selectedSalon: SalonDiscussion;


  constructor(private service: InstantMessagingService) { }

  ngOnInit() {
  }

  onSelect(salon: SalonDiscussion): void {
    
    this.selectedSalon = salon;
    this.service.sendIdSalon(salon.id);
  }

  

}
