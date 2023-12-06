import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import userModule from './modules/userModule.js'

const store = createStore({
  modules: {
    user: userModule,
  },
  plugins: [createPersistedState()],
})

export default store