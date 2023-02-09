import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import News from '../views/News.vue';
import NewsDetails from '../views/NewsDetails.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: { guest: true },
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: { guest: true },
	},
	{
		path: '/news',
		name: 'News',
		component: News,
		meta: { requiresAuth: true },
	},
	{
		path: '/news-details',
		name: 'NewsDetails',
		component: NewsDetails,
		meta: { requiresAuth: true },
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

function wait() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 100);
	});
}

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.getters.isAuthenticated) {
			next();
			return;
		}
		await wait();
		next('/login');
	} else {
		next();
	}
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.guest)) {
		if (store.getters.isAuthenticated) {
			next('/news');
			return;
		}
		next();
	} else {
		next();
	}
});

export default router;
