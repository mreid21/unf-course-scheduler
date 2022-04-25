<script setup lang="ts">
const { name, id, username } =
  defineProps<{ name: string; id: number; username: string }>();
const emit = defineEmits(['delete', 'copy']);
</script>

<template>
  <div class="flex border rounded-md px-2 py-4">
    <router-link
      class="text-left grow"
      :to="{ path: `/${username}/Plans/${id}` }"
    >
      <p>{{ name }}</p>
    </router-link>
    <div class="flex grow-0 gap-4">
      <button @click="emit('copy', id)">Copy</button>
      <button @click="emit('delete', { id: id, name: name })">Delete</button>
    </div>
  </div>
</template>
