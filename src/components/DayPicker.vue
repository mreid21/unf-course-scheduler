<script setup lang="ts">
import { ref, watchEffect } from 'vue';
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3 border p-2 mb-8 rounded-md">
    <div>
      <input id="mwf" class="appearance-none" type="radio" name="radio" />
      <label
        class="inline-block border w-12 h-12 justify-center items-center bg-white rounded-md hover:bg-blue-50"
        for="mwf"
      >
        <div class="grid w-full h-full place-items-center">
          <span class="">MWF</span>
        </div>
      </label>
    </div>

    <div>
      <input id="mw" class="appearance-none" type="radio" name="radio" />
      <label
        class="inline-block border w-12 h-12 justify-center items-center bg-white rounded-md hover:bg-blue-50"
        for="mw"
      >
        <div class="grid w-full h-full place-items-center">
          <span class="">MW</span>
        </div>
      </label>
    </div>

    <div>
      <input id="tr" class="appearance-none" type="radio" name="radio" />
      <label
        class="inline-block border w-12 h-12 justify-center items-center bg-white rounded-md hover:bg-blue-50"
        for="tr"
      >
        <div class="grid w-full h-full place-items-center">
          <span class="">TR</span>
        </div>
      </label>
    </div>

    <div>
      <input id="m" class="appearance-none" type="radio" name="radio" />
      <label
        class="inline-block border w-12 h-12 justify-center items-center bg-white rounded-md hover:bg-blue-50"
        for="m"
      >
        <div class="grid w-full h-full place-items-center">
          <span class="">M</span>
        </div>
      </label>
    </div>

    <div>
      <input id="t" class="appearance-none" type="radio" name="radio" />
      <label
        class="inline-block border w-12 h-12 justify-center items-center bg-white rounded-md hover:bg-blue-50"
        for="t"
      >
        <div class="grid w-full h-full place-items-center">
          <span class="">T</span>
        </div>
      </label>
    </div>

    <div>
      <input id="w" class="appearance-none" type="radio" name="radio" />
      <label
        class="inline-block border w-12 h-12 justify-center items-center bg-white rounded-md hover:bg-blue-50"
        for="w"
      >
        <div class="grid w-full h-full place-items-center">
          <span class="">W</span>
        </div>
      </label>
    </div>

    <div>
      <input id="r" class="appearance-none" type="radio" name="radio" />
      <label
        class="inline-block border w-12 h-12 justify-center items-center bg-white rounded-md hover:bg-blue-50"
        for="r"
      >
        <div class="grid w-full h-full place-items-center">
          <span class="">R</span>
        </div>
      </label>
    </div>

    <div>
      <input id="f" class="appearance-none" type="radio" name="radio" />
      <label
        class="inline-block border w-12 h-12 justify-center items-center bg-white rounded-md hover:bg-blue-50"
        for="f"
      >
        <div class="grid w-full h-full place-items-center">
          <span class="">F</span>
        </div>
      </label>
    </div>
  </div>
</template>
