"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(server, connection) {
        this.server = server;
        this.connection = connection;
        this.usernameRegex = /^[a-zA-Z0-9]*$/;
        this.username = null;
        this.room = null;
        connection.on('message', (message) => this.onMessage(message.utf8Data));
        connection.on('close', () => this.onClose());
    }
    onClose() {
        if (this.room == null)
            return;
        this.room.removeClient(this);
    }
    // (1) METHODES POUR ENVOYER LES DONNEES VERS LE CLIENT
    sendMessage(type, data) {
        const message = { type: type, data: data };
        this.connection.send(JSON.stringify(message)); //La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON
    }
    sendInstantMessage(content, author, date) {
        const instantMessage = { content: content, author: author, date: date };
        this.sendMessage('instant_message', instantMessage);
    }
    sendClient(username, date) {
        const data = { username: username, date: date };
        this.sendMessage('client', data);
    }
    sendUsername(username) {
        this.username = username;
        this.sendMessage('username', username);
    }
    // (2) METHODES POUR RECUPERER LES DONNEES DU CLIENT
    onInstantMessage(content) {
        //if (!(typeof 'content' === 'string')) return;
        if (this.username == null)
            return;
        if (this.room == null)
            return;
        this.room.broadcastInstantMessage(content, this.username);
    }
    onUsername(username) {
        //if (!(typeof 'username' === 'string')) return;
        // if (!this.usernameRegex.test(username)) return;
        this.username = username;
        this.sendMessage('login', { username: username });
        this.username = username;
        //this.server.addClient(this,this.room.id);
        this.server.addClient(this);
    }
    onIdSalon(id) {
        if (!(typeof 'id' === 'number'))
            return;
        this.room.id = id;
        console.log(id);
        //this.server.broadcastUsername(this.username); // c'est moi qui a jouter
    }
    /*private onUsername2(username) {
        //if (!(typeof 'username' === 'string')) return;
       // if (!this.usernameRegex.test(username)) return;
        this.username = username;
        
    }*/
    onMessage(utf8Data) {
        const message = JSON.parse(utf8Data);
        switch (message.type) {
            case 'instant_message':
                this.onInstantMessage(message.data);
                break;
            case 'client':
                this.onUsername(message.data);
                break;
            case 'id_salon':
                this.onIdSalon(message.data);
                break;
        }
    }
}
exports.Client = Client;
