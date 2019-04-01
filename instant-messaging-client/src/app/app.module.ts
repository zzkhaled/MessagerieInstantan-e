import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageListComponent } from './message-list/message-list.component';
import { InstantMessageComponent } from './instant-message/instant-message.component';
import { NewMessageFormComponent } from './new-message-form/new-message-form.component';
import { FormsModule } from '@angular/forms';
import { InstantMessagingService } from './instant-messaging.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { AutoScrollDirective } from './auto-scroll.directive';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { SalonDiscussionComponent } from './salon-discussion/salon-discussion.component';
import { SalonListComponent } from './salon-list/salon-list.component';
import { NewImageFormComponent } from './new-image-form/new-image-form.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    InstantMessageComponent,
    NewMessageFormComponent,
    LoginFormComponent,
    AutoScrollDirective,
    ClientsListComponent,
    SalonDiscussionComponent,
    SalonListComponent,
    NewImageFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [InstantMessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
