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
    path: '/verification',
    name: 'Verification',
    component: () => import('../views/EmailAuthen')
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
    path: '/:username/profile',
    name: 'editProfile',
    component: () => import('../views/EditProfile.vue')
  },
  {
    path: '/musics/recording',
    name: 'recording',
    component: () => import('../views/Record.vue')
  },
  {
    path: '/musics/:musicId/recording/:file',
    name: 'edit',
    component: () => import('../views/Edit.vue')
  },
  {
    path: '/musics/recordsetting',
    name: 'recordsetting',
    component: () => import('../views/RecordSetting.vue')
  },
  {
    path: '/login-success',
    name: 'login-success',
    component: () => import('../components/LoginSuccess.vue')
  },
  {
    path: '/musics',
    name: 'search-music',
    props:true,
    component: () => import('../views/SearchMusic.vue'),
  },  
  {
    path: '/musics/:id/records',
    name: 'search-record',
    component: () => import('../views/SearchRecord.vue'),
  },
  {
    path: '/bandmusics/',
    name: 'searchBandMusic',
    component: () => import('../views/Band/SearchBandMusic.vue'),
  },
  {
    path: '/bands/new',
    name: 'newBand',
    component: () => import('../views/Band/NewBand.vue'), 
  },
  {
    path: '/bands/:bandname',
    name: 'bandPage',
    component: () => import('../views/Band/BandPage.vue'), 
    pathToRegexpOptions: { strict: true },
    redirect: { name: 'complete' },
    children: [
      {
        name: 'complete',
        path: 'complete',
        component: () => import('../components/bandMusic/BandComplete.vue') 
      },
      {
        name: 'workon',
        path: 'workon',
        component: () => import('../components/bandMusic/BandWorkon.vue') 
      },
    ]
  },
  {
    path: '/bands/:bandname/musics',
    name: 'addBandMusic',
    component: () => import('../views/Band/AddBandMusic.vue'), 
  },
  {
    path: '/bands/:bandname/:musicid',
    name: 'bandMusicDetail',
    component: () => import('../views/Band/BandMusicDetail.vue') 
  },
  {
    path: '/bands/:bandname/:musicid/:bandmusicid/mix',
    name: 'bandMusicMix',
    component: () => import('../views/Band/BandMixing.vue')
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
        path: '/',
        component: () => import('../components/PracticeList.vue') 
      }
    ]
  },
  {
    path: '/:username/:music',
    name: 'prac-detail',
    component: () => import('../views/PracticeDetail.vue') 
  },
  {
    path: '/:bandname/:music/processing-music',
    name: 'processing-music',
    component: () => import('../views/ProcessingMusic.vue'),
  },
  {
    path: '/:username/bucket/:music',
    name: 'bucket',
    component: () => import('../views/Bucket.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/join', '/',];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next();
    // next('/login');
  } else {
    next();
  }
});

export default router
