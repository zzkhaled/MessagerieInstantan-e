"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = require("websocket");
const http = require("http");
const client_1 = require("./client");
const rooms_1 = require("./rooms");
class Server {
    //this.room1.id=0;
    //rooms2: number[]=[0,1,2,3];
    createAndRunHttpServer(port) {
        const server = http.createServer(function (request, response) {
            response.writeHead(404);
            response.end();
        });
        server.listen(port, function () {
            console.log((new Date()) + ' Server is listening on port ' + port);
        });
        return server;
    }
    addWebSocketServer(httpServer) {
        // il faut faire une boucle for sur les différents salons pour ajouter différents websokets
        const webSocketServer = new websocket_1.server({
            httpServer: httpServer,
            autoAcceptConnections: false
        });
        webSocketServer.on('request', request => this.onWebSocketRequest(request));
    }
    onWebSocketRequest(request) {
        //la méthode onWebSocketRequest est appelée. Cette méthode accepte le client 
        //et fait en sorte qu'à chaque nouveau message du client la méthode onMessage soit appelée
        const connection = request.accept(null, request.origin);
        new client_1.Client(this, connection);
    }
    constructor(port) {
        //for(let i=0; i<this.rooms.length; i++ ){
        //this.rooms[i]= new Rooms(this);
        //}
        this.rooms = new rooms_1.Rooms(this);
        const server = this.createAndRunHttpServer(port);
        this.addWebSocketServer(server); //connecte le serveur HTTP à un serveur WebSocket
    }
    //public addClient(client : Client, id: number) {
    //this.rooms[id].addClient(client);
    //}
    addClient(client) {
        this.rooms.addClient(client);
        console.log(this.rooms.id);
    }
}
exports.Server = Server;
