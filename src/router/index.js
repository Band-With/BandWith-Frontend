import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/:username',
    name: 'myPage',
    component: () => import('../views/MyPage.vue'),
    pathToRegexpOptions: { strict: true },
    children: [
      {
        name: 'bookmark',
        path: 'bookmark',
        component: () => import('../components/Bookmark.vue') 
      },
      {
        name: 'prac',
        path: '',
        component: () => import('../components/PracticeList.vue') 
      }
    ]
  },
  {
    path: '/:username/:music',
    name: 'prac-detail',
    component: () => import('../components/PracticeDetail.vue') 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/join', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
