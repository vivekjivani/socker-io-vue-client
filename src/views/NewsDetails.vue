<template>
	<div class="container">
		<div v-if="User && User.firstName">
			<p>Hi {{ User.firstName }}</p>
		</div>
		<p v-if="showError" id="error">{{ errorMessage }}</p>
		<div class="news" v-if="news">
			<div id="news-div">
				<h4>Title</h4>
				<p name="title">{{ news.title }}</p>
				<h4>SubTitle</h4>
				<p>{{ news.subTitle }}</p>
				<h4>SubTitle</h4>

				<p>{{ news.description }}</p>
				<h4>Written By:</h4>
				<p>{{ news['User.firstName'] + news['User.lastName'] }}</p>
			</div>
		</div>
		<h3>Comments</h3>
		<div class="comments" v-if="NewsComments.length > 0">
			<ul>
				<li v-for="comment in NewsComments" :key="comment.id">
					<div id="comment-div">
						<p name="message">{{ comment.message }}</p>
						<p>Commented By: {{ comment['User.firstName'] + comment['User.lastName'] }}</p>
					</div>
				</li>
			</ul>
		</div>
		<div v-else>We have no News Comments</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'NewsDetailPage',
	components: {},
	data() {
		return {
			news: null,
			showError: false,
			errorMessage: '',
		};
	},
	created() {
		// a function to call getAllNews action
		this.news = this.$route.params.news;
		this.getAllCommentOfaNews(this.news.id);
		console.log(` newsComments : ${JSON.stringify(this.NewsComments)}`);
		this.$socket.on('news:view:error', (errorMessage) => {
			this.showError = true;
			this.errorMessage += `  ${errorMessage}`;
		});
		this.$socket.on('comment:list:error', (errorMessage) => {
			this.showError = true;
			this.errorMessage += `  ${errorMessage}`;
		});
		this.$socket.on('news:view:success', () => {
			this.showError = false;
			this.errorMessage = '';
		});
		this.$socket.on('comment:list:success', () => {
			this.showError = false;
			this.errorMessage = '';
		});
	},
	computed: {
		...mapGetters({ User: 'StateUser', NewsComments: 'StateNewsComments' }),
	},
	methods: {
		...mapActions(['GetNewsById', 'getAllCommentOfaNews']),
		submit() {
			this.CreateNews(this.form);
			this.$socket.on('news:view:error', (errorMessage) => {
				this.showError = true;
				this.errorMessage += `  ${errorMessage}`;
			});
			this.$socket.on('comment:list:error', (errorMessage) => {
				this.showError = true;
				this.errorMessage += `  ${errorMessage}`;
			});
		},
	},
};
</script>
<style scoped>
* {
	box-sizing: border-box;
}
ul {
	list-style: none;
}
#comment-div {
	padding-top: 5px;
	padding-left: 50px;
	padding-right: 50px;
	border: 3px solid #000;
	width: 500px;
	margin: auto;
	margin-bottom: 5px;
}
</style>
