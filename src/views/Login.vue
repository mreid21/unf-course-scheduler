<script setup lang="ts"></script>

<template>
  <form
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
      />
      <input
        class="appearance-none rounded-md py-2 px-2 mb-4 border-2 border-gray-100 w-full"
        placeholder="password"
        type="password"
        name="pass"
        id="pass"
      />
      <div>
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
