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
  <h1>Plans route</h1>
  <button @click="handleLogOut" class="btn btn--primary">Sign Out</button>
  <router-link :to="{ name: 'Register' }">Register</router-link>
</template>
