<script setup lang="ts">
const { name, id, username } =
  defineProps<{ name: string; id: number; username: string }>();
const emit = defineEmits(['delete'])
</script>

<template>
  <div class="flex border rounded-md px-2 py-4">
    <router-link
      class="text-left grow"
      :to="{ path: `/${username}/Plans/${id}` }"
    >
      <p>{{ name }}</p>
    </router-link>
    <button class="grow-0" @click="emit('delete', {id: id, name: name})">Delete</button>
  </div>
</template>
