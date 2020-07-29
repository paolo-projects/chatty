import socketIo from 'socket.io-client';
import GlobalConfig from '../config/Global';

export type Receiver = (content: string, author: string) => void;

type Message = { message: string, author: string };

class ChatService {
    socket: SocketIOClient.Socket;
    listeners: Receiver[] = [];

    constructor() {
        this.socket = socketIo(GlobalConfig.chatServerUri);
        this.socket.on('chat_message', (msg: string) => this.parseSocketMessage(msg));
    }

    subscribe(receiver: Receiver) {
        this.listeners.push(receiver);
    }

    unsubscribe(receiver: Receiver) {
        this.listeners = this.listeners.filter(rec => rec !== receiver);
    }

    sendMessage(content: string, author: string) {
        this.socket.emit('chat_message', JSON.stringify({message: content, author} as Message));
    }

    private parseSocketMessage(msg: string) {
        try {
            const message = JSON.parse(msg) as Message;
            if(message.message && message.author) {
                this.listeners.forEach(receiver => receiver(message.message, message.author));
            }
        } catch (e) {
            console.error('error parsing message', e);
        }
    }
}

const ChatServiceInstance = new ChatService();
export default ChatServiceInstance;