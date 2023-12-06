<template>
  <div class='text-gray-800'>
    <header class='p-4'>
      <div class='flex items-center justify-between'>
        <img src='../assets/youtube.png' alt='logo' class='h-12 w-auto ml-2' />

        <div class='flex items-center w-1/3'>
          <input v-model='searchQuery'
                 id='searchInput'
                 placeholder='Enter request'
                 class='p-2 pl-4 text-gray-800 rounded-l-full w-full focus:outline-none focus:shadow-outline-blue' />
          <button
            class='bg-gray-300 text-gray-800 p-2 rounded-r-full hover:bg-gray-400 focus:outline-none focus:shadow-outline-blue'
            @click="search">
            Search
          </button>
        </div>

        <div
          v-if='!currentUserExists'
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

        <div v-if='currentUserExists' class='flex items-center'>
          <button @click='showUploadPopup'
                  class='rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 mr-2 ml-2'>
            <i class='fas fa-plus text-white'></i>
          </button>

          <div v-if='showMenu'
               class='absolute bg-gray-200 p-4 rounded-lg right-6 top-16'>

            <div>
              {{ $store.getters.currentUser.name.length > 29 ? `@${$store.getters.currentUser.name.slice(0, 26)}...` : `@${$store.getters.currentUser.name.slice(0, 26)}`
              }}
            </div>

            <div>
              {{ $store.getters.currentUser.email.length > 29 ? `${$store.getters.currentUser.email.slice(0, 26)}...` : `${$store.getters.currentUser.email.slice(0, 26)}`
              }}
            </div>

            <router-link :to="{ name: 'MyVideos' }">
              <div>
                <button class='bg-red-500 text-white rounded-full px-4 py-2 mt-2'>My videos</button>
              </div>
            </router-link>
            <div>
              <button @click='handleLogout' class='bg-red-500 text-white rounded-full px-4 py-2 mt-2'>Logout</button>
            </div>
          </div>

          <button @click='toggleMenu'
                  class='rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 mr-2 ml-2'></button>
        </div>


        <div v-if='showAddVideoPopup' class='fixed inset-0 flex items-center justify-center'>
          <div class='bg-gray-200 p-8 rounded-lg w-1/2 border border-gray-400 relative'>
            <button @click='closeAddVideoPopup' class='absolute top-2 right-2 text-gray-600 hover:text-gray-800'>
              <i class='fas fa-times'></i>
            </button>

            <label for='video' class='block text-gray-600 mb-2 '>
              Upload Video
              <upload-file-input @change='uploadVideo' id='video' />
            </label>

            <div v-if='VideoUploadTask' class='mb-4'>
              <div class='bg-gray-300 h-2 rounded-full'>
                <div :style="{ width: VideoUploadProgress + '%' }" class='h-full bg-blue-600 rounded-full'></div>
              </div>
              <div class='text-sm mt-2 text-gray-600'>{{ VideoUploadProgress }}%</div>
            </div>
            <div v-if='popupErrors.videoError' class='text-red-500 text-sm mt-1'>{{ popupErrors.videoError }}</div>

            <label for='videoTitle' class='block text-gray-600 mb-2'>Title:</label>
            <input v-model='newVideo.title' id='videoTitle' class='p-2 w-full rounded-lg' />
            <div v-if='popupErrors.titleError' class='text-red-500 text-sm mt-1'>{{ popupErrors.titleError }}</div>

            <label for='videoDescription' class='block text-gray-600 mb-2 mt-4'>Description:</label>
            <textarea v-model='newVideo.description' id='videoDescription'
                      class='p-2 w-full max-h-80 overflow-y-auto rounded-lg' style='height: 8.5rem;'></textarea>
            <div v-if='popupErrors.descriptionError' class='text-red-500 text-sm mt-1'>{{ popupErrors.descriptionError
              }}
            </div>


            <label for='videoImage' class='block text-gray-600 mb-2 mt-4'>Upload Image
              <upload-file-input @change='uploadImage' id='videoImage' />
            </label>
            <div v-if='popupErrors.imageError' class='text-red-500 text-sm mt-1'>{{ popupErrors.imageError }}</div>

            <div v-if='ImageUploadTask' class='mb-4'>
              <div class='bg-gray-300 h-2 rounded-full'>
                <div :style="{ width: ImageUploadProgress + '%' }" class='h-full bg-blue-600 rounded-full'></div>
              </div>
              <div class='text-sm mt-2 text-gray-600'>{{ ImageUploadProgress }}%</div>
            </div>

            <div class='flex justify-center'>
              <button
                @click='addVideo'
                class='bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 mt-5 font-semibold'>
                Add
              </button>
            </div>
          </div>
        </div>

      </div>

    </header>

    <hr class='border-gray-300' />

    <div class='ml-4 mr-4 mt-7 '>
      <div>
        <Card v-for='video in videos' :key='video._id' :video='video' />
      </div>
    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import Card from '../components/common/Card.vue'
import UploadFileInput from '../components/common/UploadFileInput.vue'
import { storage } from '../firebase.js'
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import axios from 'axios'

export default {
  components: {
    Card,
    UploadFileInput,
  },
  computed: {
    currentUserExists() {
      return !!this.$store.getters.currentUser
    },
  },
  search() {
    
  },
  mounted() {
    this.$socket.on('newVideo', (videoData) => {
      console.log('New video received:', videoData)
      this.videos = [...this.videos, videoData.data]
    })

    this.$socket.on('videoDeleted', (videoData) => {
      this.videos = this.videos.filter(video => video._id !== videoData._id)
      console.log('videoDeleted', videoData)
    })
  },
  beforeDestroy() {
    this.$socket.off('newVideo')
  },
  async beforeCreate() {
    const currentUser = this.$store.getters.currentUser
    if (!!currentUser) {
      await this.$store.dispatch('handleLoginBeforeCreatedComponent', {
        email: currentUser.email,
      })
    }
  },
  async created() {
    try {
      const videosAllData = await axios.get('api/videos')
      this.videos = videosAllData.data
    } catch (err) {
      console.log('get all videos error', err)
    }
  },

  data() {
    return {
      searchQuery: '',
      showMenu: false,
      videos: [],
      showAddVideoPopup: false,
      newVideo: {
        title: '',
        description: '',
        imgURL: '',
        videoURL: '',
      },
      VideoUploadProgress: 0,
      ImageUploadProgress: 0,
      VideoUploadTask: null,
      ImageUploadTask: null,
      popupErrors: {
        videoError: '',
        imageError: '',
        titleError: '',
        descriptionError: '',
      },
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    async handleLogout() {
      await this.$store.dispatch('handleLogout')
    },
    showUploadPopup() {
      this.showAddVideoPopup = true
    },
    closeAddVideoPopup() {
      this.showAddVideoPopup = false

      if (this.VideoUploadTask) {
        this.VideoUploadTask.cancel()
        this.VideoUploadTask = null
        this.VideoUploadProgress = 0
      }

      if (this.ImageUploadTask) {
        this.ImageUploadTask.cancel()
        this.ImageUploadTask = null
        this.ImageUploadProgress = 0
      }

      this.newVideo.title = ''
      this.newVideo.description = ''
    },
    async uploadVideo(e) {
      this.popupErrors.videoError = ''

      if (this.VideoUploadTask) {
        this.VideoUploadTask.cancel()
        this.VideoUploadTask = null
        this.VideoUploadProgress = 0
      }

      const file = e.target.files[0]

      if (!file.name.toLowerCase().endsWith('.mp4') && !file.name.toLowerCase().endsWith('.webm')) {
        this.popupErrors.videoError = 'The selected file is not a supported video format (mp4 or webm)'
        return
      }

      const storageRef = ref(storage, `videos/${file.name}`)

      this.VideoUploadTask = uploadBytesResumable(storageRef, file)

      this.VideoUploadTask.on('state_changed', (snapshot) => {
        this.VideoUploadProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      })

      await this.VideoUploadTask

      this.newVideo.videoURL = await getDownloadURL(storageRef)
      console.log('Download URL video:', this.newVideo.videoURL)
    },

    async uploadImage(e) {
      this.popupErrors.imageError = ''
      const file = e.target.files[0]

      if (this.ImageUploadTask) {
        this.ImageUploadTask.cancel()
        this.ImageUploadTask = null
        this.ImageUploadProgress = 0
      }

      if (!file.name.toLowerCase().endsWith('.jpg') && !file.name.toLowerCase().endsWith('.png')) {
        this.popupErrors.imageError = 'The selected file is not a supported image format (jpg or png)'
        return
      }

      const storageRef = ref(storage, `images/${file.name}`)

      this.ImageUploadTask = uploadBytesResumable(storageRef, file)

      this.ImageUploadTask.on('state_changed', (snapshot) => {
        this.ImageUploadProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      })

      await this.ImageUploadTask

      this.newVideo.imgURL = await getDownloadURL(storageRef)
      console.log('Download URL image:', this.newVideo.imgURL)
    },
    async addVideo() {

      if (!this.newVideo.title) {
        this.popupErrors.titleError = 'This field is required'
      }

      if (!this.newVideo.description) {
        this.popupErrors.descriptionError = 'This field is required'
      }

      if (Object.values(this.popupErrors).some(error => error !== '')) {
        return
      }

      try {
        const newVideo = await axios.post('/api/videos', {
          title: this.newVideo.title,
          description: this.newVideo.description,
          imgURL: this.newVideo.imgURL,
          videoURL: this.newVideo.videoURL,
        })

        // Emit a socket event to inform other clients about the newly added video
        this.$socket.emit('addVideo', newVideo)

        this.showAddVideoPopup = false

      } catch (err) {
        console.log('video add error', err)
      }
    },
  },
}
</script>