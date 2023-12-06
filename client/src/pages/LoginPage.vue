<template>
  <div class='min-h-screen bg-gray-100 text-gray-900 flex justify-center select-none'>
    <div class='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
      <div class='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
        <div class='mt-14'>
          <router-link :to="{ name: 'Home' }">
            <logo-icon />
          </router-link>
        </div>
        <div class='flex flex-col items-center mt-6'>
          <h1 class='text-2xl xl:text-3xl font-extrabold'>
            Log In
          </h1>
          <div class='w-full flex-1 mt-8'>

            <div class='mx-auto max-w-xs'>

              <input
                v-model='email'
                class='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                type='email' placeholder='Email'
                name='email_input'
              />

              <div class='text-red-500 text-sm mt-1'>{{ emailError }}</div>

              <div class='relative mt-5'>

                <input
                  v-model='password'
                  :type="isPasswordHidden ? 'password' : 'text'"
                  class='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white pr-10'
                  placeholder='Password'
                  name='password_input'
                />

                <div class='absolute inset-y-0 right-0 flex items-center pr-3'>
                  <eye-toggle @toggle-visibility='handleToggleVisibility' />
                </div>

              </div>

              <div class='text-red-500 text-sm mt-1'>{{ passwordError }}</div>

              <!--              <router-link :to="{ name: 'PersonalPage' }">-->
              <button-auth
                @click='login'
                class='bg-indigo-500 hover:bg-indigo-700'>
                <span>Log In</span>
              </button-auth>
              <!--              </router-link>-->

              <p class='mt-6 text-base text-gray-600 text-center'>
                Don't have an account?
                <router-link :to="{ name: 'Signup' }"
                             class='border-b border-gray-500 border-dotted'>Sign Up
                </router-link>
              </p>

            </div>
          </div>
        </div>
      </div>

      <div class='flex-1 bg-indigo-100 text-center hidden lg:flex rounded-r'>
        <div class='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
             style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import LogoIcon from '../components/common/LogoIcon.vue'
import ButtonGoogleAuth from '../components/common/ButtonGoogleAuth.vue'
import EyeToggle from '../components/common/EyeToggle.vue'
import ButtonAuth from '../components/common/ButtonAuth.vue'

export default {
  components: {
    LogoIcon,
    ButtonGoogleAuth,
    EyeToggle,
    ButtonAuth,
  },

  data() {
    return {
      isPasswordHidden: true,
      emailError: '',
      passwordError: '',
      email: '',
      password: '',
    }
  },

  methods: {
    async login() {
      this.emailError = ''
      this.passwordError = ''

      const loginData = await this.$store.dispatch('handleLogin', {
        email: this.email,
        password: this.password
      })
      // const loginData = await handleLogin(this.email, this.password)

      if (loginData.status === 200) {
        this.$router.push({ name: 'Home' })
      } else {
        if (loginData.status === 404) {
          this.emailError = 'User with this email is not registered'
        } else if (loginData.status === 400) {
          this.passwordError = 'Password or email is not correct'
        }
      }
    },

    handleToggleVisibility(isHidden) {
      this.isPasswordHidden = isHidden
    },
  },
}

</script>

