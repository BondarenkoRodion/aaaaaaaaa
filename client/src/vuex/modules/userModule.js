import axios from 'axios'

const userModule = {
  state: {
    currentUser: null,
    loading: false,
    error: false,
  },

  mutations: {
    loginStart: (state) => {
      state.loading = true
    },

    loginSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action
    },

    loginFailure: (state) => {
      state.loading = false
      state.error = true
    },

    logout: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = false
    },
  },

  actions: {
    async handleLogin(context, { email, password }) {
      context.commit('loginStart')
      try {
        const res = await axios.post('api/auth/login',
          {
            email,
            password,
          })

        context.commit('loginSuccess', res.data)
        // console.log('User logged!')
        // console.log(res.data)
        return { status: 200 }
      } catch (err) {
        // console.log('Error during login:', err)
        context.commit('loginFailure')
        return { status: err.response.status }
      }
    },

    async handleLogout(context) {
      context.commit('logout')
      try {
        const res = await axios.post('api/auth/logout')
        // console.log(res.data)
      } catch (err) {
        // console.log('Error during logout:', err)
      }
    },
    async handleLoginBeforeCreatedComponent(context, { email }) {
      context.commit('loginStart')
      try {
        const res = await axios.post('api/auth/login_before_created',
          {
            email
          })

        context.commit('loginSuccess', res.data)
        // console.log('handleLoginBeforeCreatedComponent : User logged!')
        // console.log(res.data)
        return { status: 200 }
      } catch (err) {
        // console.log('handleLoginBeforeCreatedComponent: Error during login:', err)
        context.commit('loginFailure')
        return { status: err.response.status }
      }
    }
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    }
  }
}

export default userModule