import { createRouter, createWebHistory } from '@ionic/vue-router';
import Main from '../views/Main.vue'
import NotFound from '../views/NotFound.vue'
// import AllCourses from '../views/AllCourses.vue'

const routes = [
	{
		path: '/feedit',
		redirect: '/'
	},
	{
		path: '/',
		name: 'Main',
		component: Main
	},
	/*{
		path: '/course/:id',
		name: 'CourseLectures',
		component: CourseLectures,
		query: {search: "", tag: ""},
		props: true
	},
	{
		path: '/petko',
		beforeEnter(to, from, next) {
			window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
		} 
	},*/
	{
		path: '/:catchAll(.*)',
		name: 'NotFound',
		component: NotFound
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router
