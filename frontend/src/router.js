import { createRouter, createWebHistory } from 'vue-router';

// 뷰 불러오기 ------------------------------------
// 공통 뷰
import NotFoundView from '@/views/NotFoundView.vue';
import MainView from '@/views/MainView.vue';
import SearchView from '@/views/SearchView.vue';
import DetailView from '@/views/DetailView.vue';

// 라우터 설정 ------------------------------------
const routes = [
	// 공통 뷰
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
	{
		path: '/',
		name: 'Main',
		component: MainView,
	},
	{
		path: '/search',
		name: 'Search',
		component: SearchView,
	},
	{
		path : '/detail',
		// path: '/detail:id',
		name: 'Detail',
		component: DetailView,
	},
];

// 라우터 객체 생성
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
