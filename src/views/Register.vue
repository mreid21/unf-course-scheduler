<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import {useRouter} from 'vue-router'
import {useUserStore} from '../stores/useUserStore'

const { signUp } = useAuth();

const store = useUserStore();
const signUpError = ref('')

const departments = ref([
  { department_id: 1, department_name: 'Computing' },
  { department_id: 2, department_name: 'English' },
  { department_id: 3, department_name: 'Business' },
]);
const fields = reactive({
  email: '',
  password: '',
  username: '',
  department_id: 1,
});

const router = useRouter()

const handleSignUp = async () => {
  const error = await signUp(fields);

  if(error){
    signUpError.value = error
  }

  if (store.user) redirect(); 
}

const redirect = () => {
  router.push(`/${store.user!.user_metadata.username}/Plans`);
};
</script>

<template>
  <form
    @submit.prevent="handleSignUp"
    class="col-start-5 col-end-9 self-center flex flex-col gap-4 mb-8 p-8 rounded-lg shadow-sm bg-white"
  >
    <h1 class="text-2xl text-slate-800 font-bold">Register a new account.</h1>
    <fieldset class="px-4">
      <div class="flex gap-2">
        <input
          class="appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full"
          placeholder="username"
          type="text"
          name="username"
          id="username"
          v-model="fields.username"
        />
        <input
          class="appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full"
          placeholder="password"
          type="password"
          name="pass"
          id="pass"
          v-model="fields.password"
        />
      </div>
      <input
        class="appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full"
        placeholder="email"
        type="text"
        name="email"
        id="email"
        v-model="fields.email"
      />
      <div class="flex justify-center">
        <div class="mb-3 w-full">
          <select
            class="form-select text-slate-800 appearance-none block w-full px-2 py-2 text-base font-normal bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:text-slate-800 focus:border-blue-600 focus:outline-none"
            aria-label="select department"
            v-model="fields.department_id"
          >
            <option value="" selected disabled>Department</option>
            <option
              class="text-slate-800"
              v-for="department in departments"
              :key="department.department_id"
              :value="department.department_id"
            >
              {{ department.department_name }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <input class="btn btn--primary" type="submit" value="Register" />
        <router-link :to="{ name: 'Login' }"
          ><span class="text-sm underline"
            >Already have an account?</span
          ></router-link
        >
      </div>
    </fieldset>
    <span v-if="signUpError" class="text-base text-red-500">{{
          signUpError
        }}</span>
  </form>
</template>
