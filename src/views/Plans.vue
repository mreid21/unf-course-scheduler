<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
const router = useRouter();
const { signOut } = useAuth();

const handleLogOut = async () => {
  await signOut();
  router.push({ name: 'Login' });
};
</script>
<template>
  <div
    class="col-start-5 col-end-9 self-center grid gap-2 mb-8 p-4 rounded-lg shadow-sm bg-white"
  >
    <span class="justify-self-end mr-1 hover:scale-110">
      <font-awesome-icon icon="plus" size="lg"></font-awesome-icon>
    </span>
    <div class="flex justify-between border rounded-md px-2 py-4">
      <p>Summer 2022</p>
      <button class="">Delete</button>
    </div>
    <div class="flex justify-between border rounded-md px-2 py-4">
      <p>Summer 2022</p>
      <button class="">Delete</button>
    </div>
  </div>
</template>
