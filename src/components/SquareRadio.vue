<script setup lang="ts"></script>

<template>
  <div
    class="grid grid-cols-5 items-center text-center text-gray-500 border border-gray-300 rounded-lg mb-4 text-sm"
  >
    <!--FIX TAG NAMES-->
    <label class="inline-block border-r border-gray-300" for="main-campus">
      <input
        class="absolute appearance-none visibility-hidden hidden"
        type="radio"
        id="main-campus"
        name="campus"
      />
      <span class="w-full h-10 grid place-items-center">
        <span>Face-to-Face</span>
      </span>
    </label>

    <label class="inline-block" for="remote">
      <input
        class="absolute appearance-none visibility-hidden hidden"
        type="radio"
        id="remote"
        name="campus"
      />
      <span class="w-full h-10 grid place-items-center">
        <span>Hybrid</span>
      </span>
    </label>

    <label class="inline-block border-l border-gray-300" for="online">
      <input
        class="absolute appearance-none visibility-hidden hidden"
        type="radio"
        id="online"
        name="campus"
      />
      <span class="w-full h-10 grid place-items-center">
        <span>Online</span>
      </span>
    </label>

    <label class="inline-block border-l border-gray-300" for="online">
      <input
        class="absolute appearance-none visibility-hidden hidden"
        type="radio"
        id="online"
        name="campus"
      />
      <span class="w-full h-10 grid place-items-center overflow-hidden">
        <span>Independent</span>
      </span>
    </label>

    <label class="inline-block border-l border-gray-300" for="online">
      <input
        class="absolute appearance-none visibility-hidden hidden"
        type="radio"
        id="online"
        name="campus"
      />
      <span class="w-full h-10 grid place-items-center">
        <span>Off Campus</span>
      </span>
    </label>
  </div>
</template>
