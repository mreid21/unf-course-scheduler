<script setup lang="ts">
const emit = defineEmits(['close']);

const close = () => {
  console.log('close');
  emit('close');
};
</script>

<template>
  <div
    class="fixed flex justify-center items-center inset-0 z-20 backdrop-blur"
  >
    <div class="p-8 bg-white border-rounded-sm shadow-sm">
      <slot name="header"></slot>

      <slot name="main"></slot>

      <slot :close="close" name="actions"></slot>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(0.25rem);
}
</style>
