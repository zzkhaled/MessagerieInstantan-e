"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
new server_1.Server(4201);
/*import {server as WebSocketServer} from 'websocket';
import * as http from 'http';

function createAndRunHttpServer(port: number) { // creer et executer un serveur en entrant le port
    const server = http.createServer(function(request, response) { //requst argument représente la demande du client
        response.writeHead(404); // ecrire un en tete pour le client
        //response.write('Hello !!');
        response.end();// fin de la réponse
    });
    server.listen(port, function() { //Makes the server listen to ports on the computer
        console.log((new Date()) + ' Server is listening on port '+port);
    });
    return server; //retourne le serveur
}

/*function onMessage(connection, message) { //méthode recupère le messge du client et le renvoie
    connection.send("["+message+"]");
}
function sendMessage(connection, type, data) {
    const message = {type: type, data: data};
    connection.send(JSON.stringify(message));
}

function sendInstantMessage(connection, content: string, author: string, date: Date) {
    const instantMessage = {
      content: content,
      author: author,
      date: date
    }
    sendMessage(connection, 'instant_message', instantMessage);
}

function onInstantMessage(connection, content: string) {
    sendInstantMessage(connection, content, 'Anonymous', new Date());
}

function onMessage(connection, utf8Data: string) {
    const message = JSON.parse(utf8Data);
    switch (message.type) {
        case 'instant_message': onInstantMessage(connection, message.data); break;
    }
}

function onWebSocketRequest(request) {
    var connection = request.accept(null, request.origin);
    connection.on('message', (message)=>onMessage(connection, message.utf8Data));// on écoute les messages reçu par cette connexion
    // c'est ici on
    //fait un tableau dess différents conexion et parcourir pour envoyer
    //les messages à les utilisateurs conectés
}

function addWebSocketServer(httpServer) {
    const webSocketServer = new WebSocketServer({
        httpServer: httpServer,
        autoAcceptConnections: false
    });
    webSocketServer.on('request', request=>onWebSocketRequest(request));//
}

const httpServer = createAndRunHttpServer(4201);// crer un serveur avec le port fournit ici 4201
addWebSocketServer(httpServer); // instancie un nouveau WebSocketServer avec le port fournit httpServer
//connecte un serveur WebSocket (fonction addWebSocketServer)*/ 
