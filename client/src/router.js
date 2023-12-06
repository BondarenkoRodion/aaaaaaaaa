import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import SignupPage from './pages/SignupPage.vue'
import VideoPage from './pages/VideoPage.vue'
import UnexpectedError from './pages/errorPages/UnexpectedErrorPage.vue'
import MyVideosPage from './pages/MyVideosPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: HomePage,
    },
    {
      name: 'Login',
      path: '/login',
      component: LoginPage,
    },
    {
      name: 'Signup',
      path: '/signup',
      component: SignupPage,
    },
    {
      name: 'Video',
      path: '/videos/:id',
      component: VideoPage,
    },
    {
      name: 'MyVideos',
      path: '/my_videos',
      component: MyVideosPage,
    },
    {
      name: 'UnexpectedError',
      path: '/unexpectederror',
      component: UnexpectedError,
    },
  ],
})