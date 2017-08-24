
const EventEmitter = require("events"), READY_STATE_OPEN = 1;
import { Message } from "./Message";

export default class Client extends EventEmitter 
{
	connect(host, port) {
		return new Promise((resolve, reject) => {
			this.socket = new WebSocket( `ws://${host}:${port}` );
			
			this.socket.addEventListener("open", () => {
				resolve();
			});

			this.socket.addEventListener("error", ( e ) => {
				if ( e.target.readyState > READY_STATE_OPEN ) {
					reject();
				}
			});

			this.socket.addEventListener("message", e => {
				const msg = Message.fromString( e.data ), method = `on${msg.event}`;
				
				if ( !this[method] ) {
					return;
				}
				this[method]( msg.data );
			});
		});
	}

	onparticipants( data ) {
		this.emit("participants", data );
	}

	ontext( data ) {
		this.emit("text", data );
	}

	getParticipants() {
		return this.participants;
	}

	join( userName ) {
		this.userName = userName;
		this.send("join", userName );
	}

	message( text ) {
		this.send("text", {
			userName: this.userName,
			text,
			dateTime: Date.now()
		});
	}

	send(event, data) {
		this.socket.send( Message.toString(event, data) );
	}
}
