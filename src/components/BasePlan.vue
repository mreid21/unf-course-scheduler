<script setup lang="ts">
const { name, id, username } =
  defineProps<{ name: string; id: number; username: string }>();
</script>

<template>
  <router-link
    :to="{ path: `/${username}/Plans/${id}` }"
    class="flex justify-between border rounded-md px-2 py-4"
  >
    <p>{{ name }}</p>
    <button class="">Delete</button>
  </router-link>
</template>
