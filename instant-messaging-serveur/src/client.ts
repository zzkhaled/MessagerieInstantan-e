import {connection as WebSocketConnection} from 'websocket';
import { Server } from "./server";
import { Rooms } from "./rooms";

export class Client {
    
    private usernameRegex = /^[a-zA-Z0-9]*$/;
    public username: string = null;
    public room: Rooms;

    public constructor(private server: Server, private connection: WebSocketConnection) {// connection avec le server
        this.room = null;
        connection.on('message', (message)=>this.onMessage(message.utf8Data)); 
        connection.on('close', ()=>this.onClose());
    }

    private onClose() {
        if (this.room == null) return;
        this.room.removeClient(this);
    }


    // (1) METHODES POUR ENVOYER LES DONNEES VERS LE CLIENT

    private sendMessage(type: string, data: any): void {
        const message = {type: type, data: data};
        this.connection.send(JSON.stringify(message)); //La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON
    }

    public sendInstantMessage(content: any, author: string, date: Date) {
        const instantMessage = { content: content, author: author, date: date };
        this.sendMessage('instant_message', instantMessage);
    }
    public sendClient(username: string, date: Date) { // c'est moi qui a ajouter ça
        const data= { username: username, date: date  };
        this.sendMessage('client',data);   
     }

     public sendUsername(username: string) { // c'est moi qui a ajouter ça
        this.username= username ;
        this.sendMessage('username',username);  
     }
     


    // (2) METHODES POUR RECUPERER LES DONNEES DU CLIENT
    private onInstantMessage(content): void {
        //if (!(typeof 'content' === 'string')) return;
        if (this.username==null) return;
        if (this.room == null) return;
        this.room.broadcastInstantMessage(content, this.username);
    }
    
    private onUsername(username) {
        //if (!(typeof 'username' === 'string')) return;
       // if (!this.usernameRegex.test(username)) return;
        this.username = username;
        this.sendMessage('login', { username : username });
        this.username = username;
        //this.server.addClient(this,this.room.id);
        this.server.addClient(this);
        
        
    }

    private onIdSalon(id){
        if (!(typeof 'id' === 'number')) return;
        this.room.id = id;
        console.log(id);
        //this.server.broadcastUsername(this.username); // c'est moi qui a jouter
        
    }
    /*private onUsername2(username) {
        //if (!(typeof 'username' === 'string')) return;
       // if (!this.usernameRegex.test(username)) return;
        this.username = username;
        
    }*/

    
    private onMessage(utf8Data: string): void {
        const message = JSON.parse(utf8Data);
        switch (message.type) {
            case 'instant_message': this.onInstantMessage(message.data); break;
            case 'client': this.onUsername(message.data); break;
            case 'id_salon': this.onIdSalon(message.data); break;
        }
        
    }

}
