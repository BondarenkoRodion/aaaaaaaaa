import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router.js'
import store from './vuex/store.js'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')


const app = createApp(App)

app.config.globalProperties.$socket = socket
window.socket = socket

app.use(router)
app.use(store)
app.mount('#app')