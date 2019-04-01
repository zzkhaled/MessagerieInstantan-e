import { Injectable } from '@angular/core';
import { InstantMessage } from './instant-message';
import { Client } from './client';


@Injectable()
export class InstantMessagingService {
  private messages: InstantMessage[] = [];
  private socket: WebSocket;
  private logged: boolean;
  private clients: Client[]= [];
  private username: string=null;


  public constructor() {
    this.logged = false;
    this.socket = new WebSocket('ws:/localhost:4201');
    this.socket.onmessage =
      (event: MessageEvent) => this.onMessage(event.data);//
      //La propriété WebSocket.onmessage est un gestionnaire d'événements appelé lorsqu'un message 
      //est reçu du serveur. Il est appelé avec un MessageEvent.
  }


 // (1) METHODES POUR RECUPERER LES DONNEES DU SRVEUR
  private onInstantMessage(message: InstantMessage) {
    this.messages.push(message);
  }
  

  private onLogin(client: Client) {
    this.username = client.username;
    this.logged = true;
  }

 private onClient(client: Client) { // c'est moi qui à ajouter
    this.clients.push(client); 
  }
  
  private onMessage(data: string) { // reçois les données du serveur
    const message = JSON.parse(data);//La méthode JSON.parse() analyse 
    //une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne.
    switch (message.type) {
      case 'instant_message': this.onInstantMessage(message.data); break; // ajoute le message dans la liste des messages
      case 'login': this.onLogin(message.data); break; // dire que le client est connecté
      case 'client': this.onClient(message.data); break; // c'est moi qui à ajouter
      //case 'username': this.onUsername(message.data); break; // c'est moi qui à ajouter
    }
  }

  // (2) METHODES POUR ENVOYER LES DONNEES VERS LE SRVEUR

  public sendMessage(type: string, data: any) { // méthode pour envoeyer les données vers le serveur
    const message = {type: type, data: data};
    this.socket.send(JSON.stringify(message));//JSON.stringify() convertit une valeur JavaScript
    //en chaîne JSON
  }

  public sendInstantMessage(content: any) { // envoie du contenue message au service
    //Lorsque l'utilisateur souhaite envoyer un message, 
    //nous l'envoyons au serveur WebSocket (méthode sendInstantMessage).
    //À la réception d'un nouveau message du serveur, nous l'ajoutons à la liste 
    //des messages du client (méthode onMessage). 
  
      this.sendMessage('instant_message', content);
    }
   
  
    public sendUsername(username: string) { // envoie du username au serveur
      this.sendMessage('client', username);
    }
    
    public sendIdSalon(id: number) { 
    
        this.sendMessage('id_salon', id);
      }


    // (3) METHODES POUR RECUPERER LES DONNEES ET LES UTILISEES DANS LES COMPOSANTS

    public  getMessages(): InstantMessage[] { // renvois la liste de messages pour l'utiliser dans le composant message-list
    return this.messages;
    }
 
   public isLogged(): boolean { // rnvois que le client est connecté et l'utiliser dans le composant login-from
    return this.logged;
  }

   public  getClients(): Client[] {
     return this.clients;
    }
  public  getUsername(): string {
    return this.username;
    }

}