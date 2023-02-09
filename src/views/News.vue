<template>
	<div class="container">
		<div v-if="User && User.firstName">
			<p>Hi {{ User.firstName }}</p>
		</div>
		<div>
			<p v-if="showError" id="error">{{ errorMessage }}</p>
			<form @submit.prevent="submit">
				<div>
					<label for="title"
						>Title:
						<input type="text" name="title" v-model="form.title" />
					</label>
				</div>
				<div>
					<label for="subTitle"
						>SubTitle:
						<input type="text" name="subTitle" v-model="form.subTitle" />
					</label>
				</div>
				<div>
					<label for="description">
						Description:
						<textarea
							name="description"
							v-model="form.description"
							placeholder="Write up..."
						></textarea>
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
		<div class="newses" v-if="Newses">
			<ul>
				<li v-for="news in Newses" :key="news.id">
					<div id="news-div">
						<span>Title</span>
						<p name="title">{{ news.title }}</p>
						<span>Sub Title</span>
						<p>{{ news.subTitle }}</p>

						<router-link
							class="btn btn-indigo outline"
							:to="{ name: 'NewsDetails', params: { news } }"
						>
							VieMore
						</router-link>
					</div>
				</li>
			</ul>
		</div>
		<div v-else>Oh no!!! We have no News</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'NewsPage',
	components: {},
	data() {
		return {
			form: {
				title: '',
				subTitle: '',
				description: '',
			},
			showError: false,
			errorMessage: '',
		};
	},
	created() {
		// a function to call getAllNews action
		this.GetAllNews();
	},
	computed: {
		...mapGetters({ Newses: 'StateNewses', User: 'StateUser' }),
	},
	methods: {
		...mapActions(['GetAllNews', 'CreateNews']),
		submit() {
			this.CreateNews(this.form);
			this.$socket.on('news:create:error', (errorMessage) => {
				this.showError = true;
				this.errorMessage = errorMessage;
			});
			this.$socket.on('news:create:success', () => {
				this.showError = false;
				this.errorMessage = '';
			});
		},
		openNewsDetails(newsId) {
			this.$router.push({ path: '/news-details', params: { newsId } });
		},
	},
};
</script>
<style scoped>
* {
	box-sizing: border-box;
}
label {
	padding: 12px 12px 12px 0;
	display: inline-block;
}
ul {
	list-style: none;
}
#news-div {
	padding-top: 5px;
	padding-left: 50px;
	padding-right: 50px;
	border: 3px solid #000;
	width: 500px;
	margin: auto;
	margin-bottom: 5px;
}
</style>

<!--

	button[type='submit'] {
	background-color: #4caf50;
	color: white;
	padding: 12px 20px;
	cursor: pointer;
	border-radius: 30px;
	margin: 10px;
}
button[type='submit']:hover {
	background-color: #45a049;
}
input {
	width: 60%;
	margin: 15px;
	border: 0;
	box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
	padding: 10px;
	border-radius: 30px;
}
textarea {
	width: 75%;
	resize: vertical;
	padding: 15px;
	border-radius: 15px;
	border: 0;
	box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
	height: 150px;
	margin: 15px;
}

 -->
