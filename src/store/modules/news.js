const state = {
	newses: null,
	news: null,
};

const getters = {
	StateNewses: (_state) => _state.newses,
	StateNews: (_state) => _state.news,
};

const actions = {
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
};

const mutations = {
	setNews(_state, news) {
		const storeState = _state;
		storeState.news = news;
	},
	setNewses(_state, newses) {
		const storeState = _state;
		storeState.newses = newses;
	},
	setNewsComments(_state, comments) {
		const storeState = _state;
		storeState.newsComments = comments;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
