const state = {
	socket: null,
};

const getters = {
	StateSocket: (_state) => _state.socket,
};

const actions = {};

const mutations = {
	setSocket(_state, socket) {
		const storeState = _state;
		storeState.socket = socket;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
