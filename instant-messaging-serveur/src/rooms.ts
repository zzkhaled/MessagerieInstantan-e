import * as http from 'http';
import {server as WebSocketServer, connection as WebSocketConnection} from 'websocket';

import { Server } from "./server";
import { Client } from './client';

export class Rooms {

    public id: number = null;

    public constructor(private server: Server) { }

    

    //
    private clients: Client[] = [];

    // public constructor(port: number) {
    //     const server = this.createAndRunHttpServer(port);
    //     // ou faire ici une boucle des sallons et maitre l'id de saalon en paramètre 
    //     //de la fonction addWebSocketServer(server, id) 
    //     this.addWebSocketServer(server); //connecte le serveur HTTP à un serveur WebSocket
    // }

    public broadcastInstantMessage(content: any, author: string): void {
        const date = new Date();
        for (const client of this.clients) {
          client.sendInstantMessage(content, author, date);
        }
      }

    public removeClient(client: Client) {
        this.clients.splice(this.clients.indexOf(client), 1);
    }

    public addClient(client : Client) {
        client.room = this;
        this.clients.push(client);
        this.broadcastClient(client.username);
    }

    public broadcastClient(username: string): void { // c'est moi qui à jouter 
        const date = new Date();
        for (const client of this.clients) {
          client.sendClient(username, date);
        }
      }
      deleteClient(client: Client) {
        this.clients.splice(this.clients.indexOf(client), 1);
    }
    


}