const state = {
	newsComments: null,
};

const getters = {
	StateNewsComments: (_state) => _state.newsComments,
};

const actions = {
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
};

const mutations = {
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
