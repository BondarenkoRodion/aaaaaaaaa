<template>
  <div class='card-container'>
    <div @click='showVideo'
         class='card'>
      <img :src='video.imgURL' alt='Video Thumbnail' class='card-image' />
    </div>

    <div class='flex'>
      <div>
        <div class='rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 mt-3'></div>
      </div>
      <div>
        <div class='card-title mt-1'>
          <div class='font-bold tracking-wide'>{{ video.title }}</div>
          <div>@{{ user.name }}</div>
          <div>{{ formattedTimeAgo }}</div>
          <slot></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import axios from 'axios'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export default {
  props: {
    video: {
      type: Object,
    },
  },
  data() {
    return {
      user: {},
    }
  },
  async created() {
    try {
      const user = await axios.get(`api/users/${this.video.userId}`)
      this.user = user.data
    } catch (err) {
      console.log('card: get user error')
    }
  },
  computed: {
    formattedTimeAgo() {
      return timeAgo.format(new Date(this.video.createdAt))
    },
  },
  methods: {
    showVideo() {
      this.$router.push({ name: 'Video', params: {id: this.video._id} })
    },
  },
}
</script>

<style scoped>
.card-container {
  width: 25%;
  padding: 6px;
  box-sizing: border-box;
  display: inline-block;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-title {
  padding: 10px;
  font-size: 14px;
}

@media (max-width: 1030px) {
  .card-container {
    width: 33.3%;
  }
}

@media (max-width: 780px) {
  .card-container {
    width: 50%;
  }
}

@media (max-width: 600px) {
  .card-container {
    width: 100%;
  }
}

</style>