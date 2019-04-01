import { Component, OnInit } from '@angular/core';
import { InstantMessagingService } from '../instant-messaging.service';

@Component({
  selector: 'app-new-image-form',
  templateUrl: './new-image-form.component.html',
  styleUrls: ['./new-image-form.component.css']
})
export class NewImageFormComponent implements OnInit {
  url= null;
  selectedFile= null;
  constructor(private service: InstantMessagingService) { }

  ngOnInit() {
  }

  private onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
          this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
    
    this.selectedFile=event.target.files[0]; 
  }

  private onUpload(): void {
    this.service.sendInstantMessage(this.selectedFile);
    this.selectedFile= null;
    this.url= null;
  }

}
