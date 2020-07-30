import socketIo from 'socket.io-client';
import GlobalConfig from '../config/Global';

export interface Receiver {
    onMessage(content: string, author: string): void;
    onConnectionStatusChange(connected: boolean): void;
}

type Message = { message: string, author: string };

class ChatService {
    socket: SocketIOClient.Socket;
    listeners: Receiver[] = [];

    constructor(name: string) {
        this.socket = socketIo(GlobalConfig.chatServerUri, {
            query: {
                author: name
            }
        });
        this.socket.on('chat_message', (msg: string) => this.parseSocketMessage(msg));
        this.socket.on('connect', () => this.emitConnectionStatus(true));
        this.socket.on('disconnect', () => this.emitConnectionStatus(false));
        this.socket.on('reconnect', () => this.emitConnectionStatus(true));
    }

    subscribe(receiver: Receiver) {
        this.listeners.push(receiver);
    }

    unsubscribe(receiver: Receiver) {
        this.listeners = this.listeners.filter(rec => rec !== receiver);
    }

    sendMessage(content: string, author: string) {
        this.socket.emit('chat_message', content);
    }

    reset(name: string) {
        this.socket.close();
        this.socket = socketIo(GlobalConfig.chatServerUri, {
            query: {
                author: name
            }
        });
        this.socket.on('chat_message', (msg: string) => this.parseSocketMessage(msg));
        this.socket.on('connect', () => this.emitConnectionStatus(true));
        this.socket.on('disconnect', () => this.emitConnectionStatus(false));
        this.socket.on('reconnect', () => this.emitConnectionStatus(true));
    }

    terminate() {
        if(this.socket.connected) {
            this.socket.disconnect();
        }
    }

    private emitConnectionStatus(connected: boolean) {
        this.listeners.forEach(receiver => receiver.onConnectionStatusChange(connected));
    }

    private parseSocketMessage(msg: string) {
        try {
            const message = JSON.parse(msg) as Message;
            if(message.message && message.author) {
                this.listeners.forEach(receiver => receiver.onMessage(message.message, message.author));
            }
        } catch (e) {
            console.error('error parsing message', e);
        }
    }
}

export default ChatService;