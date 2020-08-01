import socketIo from 'socket.io-client';
import GlobalConfig from '../config/Global';
import ConnectedClient from './client/ConnectedClient';

export type MessageCallback = (content: string, author: string) => void;
export type ClientsCallback = (clients: ConnectedClient[]) => void;
export type ConnectionStatusCallback = (connected: boolean) => void;

export interface Event {
    "message": MessageCallback;
    "clients": ClientsCallback;
    "connectionstatus": ConnectionStatusCallback;
}

type Message = { message: string, author: string };

class ChatService {
    private socket?: SocketIOClient.Socket;

    private messageListeners: MessageCallback[] = [];
    private clientsListeners: ClientsCallback[] = [];
    private connectionStatusListeners: ConnectionStatusCallback[] = [];

    name?: string;
    connected: boolean = false;

    connect(name: string, error: (error:any) => void) {
        this.name = name;
        this.socket = socketIo(GlobalConfig.chatServerUri, {
            query: {
                author: name
            }
        });
        this.socket.on('chat_message', (msg: string) => this.parseSocketMessage(msg));
        this.socket.on('connected_clients', (clients: string) => this.parseClients(clients));
        this.socket.on('connect', () => this.emitConnectionStatus(true));
        this.socket.on('disconnect', () => this.emitConnectionStatus(false));
        this.socket.on('reconnect', () => this.emitConnectionStatus(true));
        this.socket.on('error', error);
    }

    subscribe<T extends keyof Event>(event: T, receiver: Event[T]) {
        switch(event) {
            case "message":
                this.messageListeners.push(receiver as MessageCallback);
                break;
            case "clients":
                this.clientsListeners.push(receiver as ClientsCallback);
                break;
            case "connectionstatus":
                this.connectionStatusListeners.push(receiver as ConnectionStatusCallback);
                break;
        }
    }

    unsubscribe<T extends keyof Event>(event: T, receiver: Event[T]) {
        switch(event) {
            case "message":
                this.messageListeners = this.messageListeners.filter(r => r !== receiver);
                break;
            case "clients":
                this.clientsListeners = this.clientsListeners.filter(r => r !== receiver);
                break;
            case "connectionstatus":
                this.connectionStatusListeners = this.connectionStatusListeners.filter(r => r !== receiver);
                break;
        }
    }

    sendMessage(content: string, author: string) {
        this.socket?.emit('chat_message', content);
    }

    reset(name: string, error: (error: any) => void) {
        this.name = name;
        this.socket?.close();

        this.connect(name, error);
    }

    terminate() {
        if(this.socket?.connected) {
            this.socket.disconnect();
        }
        this.connected = false;
    }

    private emitConnectionStatus(connected: boolean) {
        this.connected = connected;
        this.connectionStatusListeners.forEach(receiver => receiver(connected));
    }

    private parseClients(clients: string) {
        try {
            const cls = JSON.parse(clients) as ConnectedClient[];
            this.clientsListeners.forEach(receiver => receiver(cls));
        } catch(err) {
            console.error('Error parsing clients', err);
        }
    }

    private parseSocketMessage(msg: string) {
        try {
            const message = JSON.parse(msg) as Message;
            if(message.message && message.author) {
                this.messageListeners.forEach(receiver => receiver(message.message, message.author));
            }
        } catch (e) {
            console.error('error parsing message', e);
        }
    }
}

export default new ChatService();