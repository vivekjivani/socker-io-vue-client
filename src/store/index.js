import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createWebSocketPlugin from '../services/websocketStorePlugin';
import socketIO from '../services/socketio.service';
import state from './modules/original';

Vue.use(Vuex);
const websocketPlugin = createWebSocketPlugin(socketIO);
export default new Vuex.Store({
	modules: {
		state,
	},
	plugins: [websocketPlugin, createPersistedState()],
});

// import user from './modules/user';
// import news from './modules/news';
// import comment from './modules/comment';
// import socket from './modules/socket';
// user,
// news,
// comment,
// socket,
