const state = {
	socket: null,
	token: null,
	user: null,
	newses: null,
	newsComments: null,
};

const getters = {
	isAuthenticated: (_state) => !!_state.token,
	StateNewses: (_state) => _state.newses,
	StateNews: (_state) => _state.newses,
	StateNewsComments: (_state) => _state.newsComments,
	StateUser: (_state) => _state.user,
	StateToken: (_state) => _state.token,
	StateSocket: (_state) => _state.socket,
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

	GetAllNews({ commit, getters: _getters }) {
		const getAllNewsPayload = { token: _getters.StateToken };
		console.log('GetAllNews Input: ', JSON.stringify(getAllNewsPayload));
		this.$socket.emit('news:list', getAllNewsPayload);
		this.$socket.on('news:list:success', async (response) => {
			console.log('GetAllNews Response', JSON.stringify(response));
			commit('setNewses', response.newses);
		});
	},

	GetNewsById({ commit, getters: _getters }, newsId) {
		const getNewsByIdPayload = { token: _getters.StateToken, newsId };
		this.$socket.emit('news:view', getNewsByIdPayload);
		this.$socket.on('news:view:success', (response) => {
			commit('setNews', response.news);
		});
	},

	CreateNews({ dispatch, getters: _getters }, news) {
		const createNewsPayload = {
			title: news.title,
			subTitle: news.subTitle,
			description: news.description,
			token: _getters.StateToken,
		};
		this.$socket.emit('news:create', createNewsPayload);
		this.$socket.on('news:create:success', () => {
			dispatch('GetAllNews');
		});
	},

	CreateComment({ dispatch, getters: _getters }, comment) {
		const createCommentPayload = {
			message: comment.message,
			userId: comment.userId,
			newsId: comment.newsId,
			token: _getters.StateToken,
		};
		this.$socket.emit('comment:create', createCommentPayload);
		this.$socket.on('comment:create:success', () => {
			const getAllCommentsOfaNewsPayload = {
				newsId: createCommentPayload.newsId,
			};
			dispatch('getAllCommentOfaNews', getAllCommentsOfaNewsPayload);
		});
	},

	getAllCommentOfaNews({ commit, getters: _getters }, newsId) {
		const getAllCommentsOfaNews = {
			newsId,
			token: _getters.StateToken,
		};
		this.$socket.emit('comment:list', getAllCommentsOfaNews);
		this.$socket.on('comment:list:success', (response) => {
			console.log(`Comments : ${JSON.stringify(response)}`);
			commit('setNewsComments', response.comments);
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
	setNewses(_state, newses) {
		const storeState = _state;
		storeState.newses = newses;
	},
	setNewsComments(_state, comments) {
		const storeState = _state;
		storeState.newsComments = comments;
	},
	setSocket(_state, socket) {
		const storeState = _state;
		storeState.socket = socket;
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
