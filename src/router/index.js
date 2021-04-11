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
    path: '/find',
    name: 'find',
    component: () => import('../views/Find.vue')
  },
  {
    path: '/login-success',
    name: 'login-success',
    component: () => import('../components/LoginSuccess.vue')
  },
  {
    path: '/musics',
    name: 'search-music',
    component: () => import('../views/SearchMusic.vue'),
    children: [
      {
        path: '',
        name: 'music-by-related',
        component: () => import('../components/SearchMusicByRelated.vue'),
      },
      {
        path: '../musics',
        name: 'music-by-record',
        component: () => import('../components/SearchMusicByRecord.vue'),
      },
      {
        path: '../musics',
        name: 'music-by-like',
        component: () => import('../components/SearchMusicByLike.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/join', '/', '/musics'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    // next('/login');
    next();
  } else {
    next();
  }
});

export default router
