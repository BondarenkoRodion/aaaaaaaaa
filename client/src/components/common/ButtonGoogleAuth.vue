<template>
  <button
    class='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow-md focus:shadow-sm focus:shadow-outline'>
    <div class='bg-white p-2 rounded-full'>
      <google-icon />
    </div>
    <span class='ml-4'>
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import GoogleIcon from '../ui/GoogleIcon.vue'
</script>