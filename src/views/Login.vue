<template>
	<div class="login">
		<div>
			<p v-if="showError" id="error">{{ errorMessage }}</p>
			<form @submit.prevent="submit">
				<div>
					<label for="userEmail"
						>userEmail: <input type="email" name="userEmail" v-model="form.userEmail"
					/></label>
				</div>
				<div>
					<label for="password"
						>Password:
						<input type="password" name="password" v-model="form.password" />
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'LoginPage',
	components: {},
	data() {
		return {
			form: {
				userEmail: '',
				password: '',
			},
			showError: false,
			errorMessage: '',
		};
	},
	methods: {
		...mapActions(['LogIn']),
		submit() {
			const userLoginInfo = {
				email: this.form.userEmail,
				password: this.form.password,
			};
			this.LogIn(userLoginInfo);
			this.$socket.on('user:login:success', () => {
				this.errorMessage = '';
				this.showError = false;
				this.$router.push('/news');
			});
			this.$socket.on('user:login:error', (errorMessage) => {
				this.errorMessage = errorMessage;
				this.showError = true;
			});
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
button[type='submit'] {
	background-color: #4caf50;
	color: white;
	padding: 12px 20px;
	cursor: pointer;
	border-radius: 30px;
}
button[type='submit']:hover {
	background-color: #45a049;
}
input {
	margin: 5px;
	box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
	padding: 10px;
	border-radius: 30px;
}
#error {
	color: red;
}
</style>
