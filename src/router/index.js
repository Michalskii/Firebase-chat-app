import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ChatView from '../views/ChatView.vue';
import AccountCreated from '../views/AccountCreated.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/chatview',
			name: 'chatview',
			component: ChatView,
		},

		{
			path: '/auth',
			name: 'auth',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/Auth.vue'),
		},
		{
			path: '/gz',
			name: 'accountcreated',
			component: AccountCreated,
		},
	],
});

export default router;
