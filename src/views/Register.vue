<template>
	<div class="register">
		<div>
			<form @submit.prevent="submit">
				<div>
					<label for="firstName"
						>FirstName: <input type="text" name="firstName" v-model="form.firstName"
					/></label>
				</div>
				<div>
					<label for="lastName"
						>LastName: <input type="text" name="lastName" v-model="form.lastName"
					/></label>
				</div>
				<div>
					<label for="email">Email: <input type="text" name="email" v-model="form.email" /></label>
				</div>
				<div>
					<label for="password"
						>Password: <input type="password" name="password" v-model="form.password"
					/></label>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
		<p v-if="showError" id="error">{{ errorMessage }}</p>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'RegisterPage',
	components: {},
	data() {
		return {
			form: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			},
			showError: false,
			errorMessage: '',
		};
	},
	methods: {
		...mapActions(['Register']),
		submit() {
			this.Register(this.form);
			this.$socket.on('user:register:success', () => {
				this.$router.push('/news');
				this.showError = false;
			});
			this.$socket.on('user:register:error', (errorMessage) => {
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
