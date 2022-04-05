<script setup lang="ts">
import { useUserStore } from '../stores/useUserStore';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';

const store = useUserStore();
const router = useRouter();
const { signIn, getUser } = useAuth();
const signInError = ref('');
const fields = reactive({ email: '', password: '' });

const handleSignIn = async () => {
  const error = await signIn(fields.email, fields.password);
  if (error) signInError.value = error;

  if (store.user) redirect();
};

const redirect = () => {
  router.push(`/${store.user!.user_metadata.username}/Plans`);
};
</script>

<template>
  <p v-if="store.user">Logged in...</p>
  <form
    @submit.prevent="handleSignIn"
    class="col-start-5 col-end-9 self-center flex flex-col gap-4 mb-8 p-8 rounded-lg shadow-sm bg-white"
  >
    <h1 class="text-2xl text-slate-800 font-bold">Log in to your account</h1>
    <fieldset class="px-4">
      <input
        class="appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full"
        placeholder="email"
        type="text"
        name="email"
        id="email"
        v-model="fields.email"
      />
      <input
        class="appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full"
        placeholder="password"
        type="password"
        name="pass"
        id="pass"
        v-model="fields.password"
      />
      <div>
        <span v-if="signInError" class="text-base text-red-500">{{
          signInError
        }}</span>
        <input class="btn btn--primary" type="submit" value="Sign In" />
        <router-link :to="{ name: 'Register' }"
          ><span class="text-sm underline"
            >Create an account.</span
          ></router-link
        >
      </div>
    </fieldset>
  </form>
</template>
