<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './stores/useUserStore';
import { useAuth } from './composables/useAuth';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const { getUser } = useAuth();
const router = useRouter();

onMounted(() => {
  getUser();
  if (userStore.user) {
    router.push(`/${userStore.user!.user_metadata.username}/Plans`);
  } else router.push({ name: 'Login' });
});
</script>

<template>
  <div class="lg:h-screen bg-gray-50">
    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
