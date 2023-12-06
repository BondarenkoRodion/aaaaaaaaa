<template>
    <eye-show v-if='!isHidden' @click='toggleVisibility' />
    <eye-hide v-else-if='isHidden' @click='toggleVisibility' />
</template>

<script>
import EyeShow from '../ui/EyeShow.vue'
import EyeHide from '../ui/EyeHide.vue'

export default {
  components: { EyeHide, EyeShow },

  emits: ['toggle-visibility'],

  data() {
    return {
      isHidden: true,
    }
  },
  
  methods: {
    toggleVisibility() {
      this.isHidden = !this.isHidden
      this.$emit('toggle-visibility', this.isHidden);
    },
  },
}
</script>