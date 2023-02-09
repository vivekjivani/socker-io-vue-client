const state = {
	token: null,
	user: null,
};

const getters = {
	isAuthenticated: (_state) => !!_state.token,
	StateUser: (_state) => _state.user,
};

const actions = {
	Register({ dispatch }, form) {
		const userRegistrationPayload = {
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			password: form.password,
		};
		this.$socket.emit('user:register', userRegistrationPayload);
		this.$socket.on('user:register:success', () => {
			const userLoginPayload = {
				email: userRegistrationPayload.email,
				password: userRegistrationPayload.password,
			};
			dispatch('LogIn', userLoginPayload);
		});
	},

	LogIn({ commit }, userLoginPayload) {
		this.$socket.emit('user:login', userLoginPayload);
		this.$socket.on('user:login:success', async (response) => {
			console.log('LogIn Response', JSON.stringify(response));
			commit('setToken', response.token);
			commit('setUser', response.user);
		});
	},

	LogOut({ commit }) {
		commit('logout');
	},
};

const mutations = {
	setUser(_state, username) {
		const storeState = _state;
		storeState.user = username;
	},
	setToken(_state, token) {
		const storeState = _state;
		storeState.token = token;
	},
	logout(_state) {
		const storeState = _state;
		storeState.user = null;
		storeState.token = null;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
