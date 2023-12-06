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
            Sign Up
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

              <div class='relative mt-5'>
                <input
                  v-model='name'
                  class='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='text' placeholder='Name'
                  name='name_input'
                />

                <div class='text-red-500 text-sm mt-1'>{{ nameError }}</div>
              </div>

              <button-auth
                @click='signup'
                class='bg-green-500 hover:bg-green-700'>
                <signup-icon />
                <span class='ml-3'>Sign Up</span>
              </button-auth>

              <p class='mt-6 text-base text-gray-600 text-center'>
                Have an account?
                <router-link :to="{ name: 'Login' }"
                             class='border-b border-gray-500 border-dotted'>Log In
                </router-link>
              </p>

            </div>
          </div>
        </div>
      </div>

      <div class='flex-1 bg-green-100 text-center hidden lg:flex rounded-r'>
        <div class='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
             style="background-image: url('https://svgshare.com/i/zs4.svg');">
          <!-- https://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz -->
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
import SignupIcon from '../components/ui/SignupIcon.vue'
import { handleSignup } from '../services/auth.js'

export default {
  components: {
    LogoIcon,
    ButtonGoogleAuth,
    EyeToggle,
    ButtonAuth,
    SignupIcon,
  },

  data() {
    return {
      isPasswordHidden: true,
      emailError: '',
      passwordError: '',
      nameError: '',
      email: '',
      password: '',
      name: '',
    }
  },

  methods: {
    async signup() {
      this.emailError = ''
      this.passwordError = ''

      if (!this.validateEmail(this.email)) {
        this.emailError = 'Email is not valid'
      }

      const passwordValidationResult = this.validatePassword(this.password)
      if (passwordValidationResult) {
        this.passwordError = passwordValidationResult
      }

      if (this.name === '') {
        this.nameError = 'This field is required'
      }

      if (this.emailError || this.passwordError) {
        return
      }

      const signupData = await handleSignup(this.email, this.password, this.name)
      console.log(signupData)

      if (signupData.status === 200) {
        this.$router.push({ name: 'Login' })
      } else {
        if (signupData.status === 409) {
          this.emailError = 'User with this email already exists'
        } else {
          this.$router.push({ name: 'UnexpectedError' })
          console.log('unexpected error during signup')
        }
      }
    },

    handleToggleVisibility(isHidden) {
      this.isPasswordHidden = isHidden
    },

    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    validatePassword(password) {
      if (/\s/.test(password)) {
        return 'Password cannot contain spaces'
      }

      if (password.length < 8) {
        return 'Password must be at least 8 characters'
      }

      return ''
    },
  },
}

</script>