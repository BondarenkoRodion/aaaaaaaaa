<template>
  <div class='text-gray-800'>
    <header class='p-4'>
      <div class='flex items-center justify-between'>
        <router-link :to="{name: 'Home'}">
          <img src='../assets/youtube.png' alt='logo' class='h-12 w-auto ml-2' />
        </router-link>
        <!-- <div class='flex items-center w-1/3'>
          <input v-model='searchQuery'
                 id='searchInput'
                 placeholder='Enter request'
                 class='p-2 pl-4 text-gray-800 rounded-l-full w-full focus:outline-none focus:shadow-outline-blue' />
          <button
            class='bg-gray-300 text-gray-800 p-2 rounded-r-full hover:bg-gray-400 focus:outline-none focus:shadow-outline-blue'>
            Search
          </button>
        </div> -->

        <div
          v-if='!loggedUserExists'
          class='flex items-center'>

          <router-link :to="{ name: 'Login' }">
            <button
              class='flex items-center text-gray-800 dark:text-white hover:bg-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-1.5 lg:py-2 h-8 mr-2 border border-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-100 '>
              Log In
            </button>
          </router-link>

          <router-link :to="{ name: 'Signup' }">
            <button
              class='flex items-center text-white bg-black hover:bg-gray-600 font-medium rounded-lg text-sm px-4 lg:px-5 py-1.5 lg:py-2 h-8 mr-2 dark:bg-gray-1000 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-100'>
              Sign Up
            </button>
          </router-link>
        </div>

        <div v-if='loggedUserExists' class='flex items-center'>
          <div v-if='this.showMenu'
               class='absolute bg-gray-200 p-4 rounded-lg right-6 top-16'>

            <div>
              {{ $store.getters.currentUser.name.length > 29 ? `@${$store.getters.currentUser.name.slice(0, 26)}...` : `@${$store.getters.currentUser.name.slice(0, 26)}`
              }}
            </div>

            <div>
              {{ $store.getters.currentUser.email.length > 29 ? `${$store.getters.currentUser.email.slice(0, 26)}...` : `${$store.getters.currentUser.email.slice(0, 26)}`
              }}
            </div>

            <div>
              <router-link :to="{name: 'Home'}">
                <button @click='handleLogout' class='bg-red-500 text-white rounded-full px-4 py-2 mt-2'>Logout</button>
              </router-link>
            </div>
          </div>

          <button @click='toggleMenu'
                  class='rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 mr-2 ml-2'></button>
        </div>
      </div>

    </header>

    <hr class='border-gray-300' />
  </div>

  <div>
    <div class='flex items-center justify-center'>
      <iframe :src='video.videoURL' height='315' width='560' allowfullscreen class='mt-10 rounded'></iframe>
    </div>
    <div class='flex items-center justify-around'>
      <div class='flex items-center justify-center'>
        <div>
          <div class='rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 mt-[-2.5rem]'></div>
        </div>
        <div>
          <div class='ml-2 card-title mt-1'>
            <div class='font-bold tracking-wide'>{{ video.title }}</div>
            <div class='tracking-wide'>{{ video.description }}</div>
            <div>@{{ author.name }}</div>
            <div>{{ formattedTimeAgo }}</div>
          </div>
        </div>
      </div>
      <div class="likes">
        <button @click="likeHandle" class="like-button">
          好
        </button>
        <div class="like-count">
          <div class="flex justify-center like-count">
            {{ currentLikes }} 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import ja from 'javascript-time-ago/locale/ja'
import axios from 'axios'
import Card from '../components/common/Card.vue'

TimeAgo.addLocale(ja)
const timeAgo = new TimeAgo('ja-JP')

export default {
  components: { Card },
  async created() {
    try {
      
      const video = await axios.get(`/api/videos/${this.$route.params.id}`)
      console.log(this);
      this.video = video.data
    } catch (err) {
      console.log('err during getting video', err)
    }

    try {
      const author = await axios.get(`/api/users/${this.video.userId}`)
      this.author = author.data
    } catch (err) {
      console.log('card: get author error')
    }
    this.currentLikes = (await axios.get(`/api/videos/${this.$route.params.id}/getlikes`)).data.length
    
  },
  data() {
    return {
      video: {},
      author: {},
      showMenu: false,
      searchQuery: '',
      currentLikes: 0
    }
  },
  computed: {
    formattedTimeAgo() {
      if (this.video?.createdAt) {
        return timeAgo.format(new Date(this.video.createdAt))
      }
    },
    loggedUserExists() {
      return !!this.$store.getters.currentUser;
      
    },
    async usersLikedNumber()
    {
      }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    async likeHandle()
    {
      const likes = (await axios.get(`/api/videos/${this.$route.params.id}/getlikes`)).data
      console.log(likes) 
      let i = likes.indexOf(this.$store.getters.currentUser._id) 
      if (i == -1) {
        likes[likes.length] = this.$store.getters.currentUser._id
        axios.get(`/api/videos/${this.$route.params.id}/addlike/${this.$store.getters.currentUser._id}`)
        this.currentLikes++;
      } else
      {
        likes.splice(i, 1)
        axios.get(`/api/videos/${this.$route.params.id}/removelike/${this.$store.getters.currentUser._id}`)
        this.currentLikes--;
      }
    },
    async handleLogout() {
      await this.$store.dispatch('handleLogout')
    },
  }
}
</script>

<!-- async likeHandle()
{
  let t = 23145;
  if (!(this.video?.likedUsers.includes(this.$store.getters.currentUser.email)) ) {
    this.video?.likedUsers.push(this.$store.getters.currentUser.email);
  } else {
    this.video?.likedUsers.splice(this.video?.likedUsers.indexOf(this.$store.getters.currentUser.email), 1);
  }
  const res = await axios.post(`api/videos/${this.$route.params.id}/likes`,
    {t}
    );

  console.log(`api/videos/${this.$route.params.id}/likes`);
}, -->
