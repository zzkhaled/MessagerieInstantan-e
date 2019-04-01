import {server as WebSocketServer, connection as WebSocketConnection} from 'websocket';
import * as http from 'http';
import { Client } from "./client";
import { Rooms } from "./rooms";

export class Server {

    rooms: Rooms;
   
    //this.room1.id=0;

    //rooms2: number[]=[0,1,2,3];

    
    private createAndRunHttpServer(port: number): http.Server { //crée et démarre un serveur HTTP sur le port 4201
        const server = http.createServer(function(request, response) {
            response.writeHead(404);
            response.end();
        });
        server.listen(port, function() {
            console.log((new Date()) + ' Server is listening on port '+port);
        });
        return server;
    }

    private addWebSocketServer(httpServer: http.Server): void {
        
        // il faut faire une boucle for sur les différents salons pour ajouter différents websokets
        const webSocketServer = new WebSocketServer({
            httpServer: httpServer,
            autoAcceptConnections: false
        });
        webSocketServer.on('request', request=>this.onWebSocketRequest(request));
    }

    private onWebSocketRequest(request): void { // Si une requête WebSocket est reçue, 
        //la méthode onWebSocketRequest est appelée. Cette méthode accepte le client 
        //et fait en sorte qu'à chaque nouveau message du client la méthode onMessage soit appelée
        
        const connection = request.accept(null, request.origin);
        new Client(this, connection);
    }

    public constructor(port: number) {
        //for(let i=0; i<this.rooms.length; i++ ){
            //this.rooms[i]= new Rooms(this);
        //}
        this.rooms= new Rooms(this);
        
        const server = this.createAndRunHttpServer(port); 
        this.addWebSocketServer(server); //connecte le serveur HTTP à un serveur WebSocket
    }

    //public addClient(client : Client, id: number) {
        
        //this.rooms[id].addClient(client);
    //}
    public addClient(client : Client) {
        
        this.rooms.addClient(client);
        console.log(this.rooms.id);
    }
}