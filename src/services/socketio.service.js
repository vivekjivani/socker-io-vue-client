import { io } from 'socket.io-client';

const socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
socket.emit('ping', 'Ping From Client');

export default socket;
