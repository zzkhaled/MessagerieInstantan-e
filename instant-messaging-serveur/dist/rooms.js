"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rooms {
    constructor(server) {
        this.server = server;
        this.id = null;
        //
        this.clients = [];
    }
    // public constructor(port: number) {
    //     const server = this.createAndRunHttpServer(port);
    //     // ou faire ici une boucle des sallons et maitre l'id de saalon en paramètre 
    //     //de la fonction addWebSocketServer(server, id) 
    //     this.addWebSocketServer(server); //connecte le serveur HTTP à un serveur WebSocket
    // }
    broadcastInstantMessage(content, author) {
        const date = new Date();
        for (const client of this.clients) {
            client.sendInstantMessage(content, author, date);
        }
    }
    removeClient(client) {
        this.clients.splice(this.clients.indexOf(client), 1);
    }
    addClient(client) {
        client.room = this;
        this.clients.push(client);
        this.broadcastClient(client.username);
    }
    broadcastClient(username) {
        const date = new Date();
        for (const client of this.clients) {
            client.sendClient(username, date);
        }
    }
    deleteClient(client) {
        this.clients.splice(this.clients.indexOf(client), 1);
    }
}
exports.Rooms = Rooms;
