<script setup lang="ts">
import { computed, reactive, ref } from "vue";

interface Props {
  placeholder: string;
  items: any;
  filter: string;
  id: string;
}

const { placeholder, items, filter } = defineProps<Props>();
const input = ref<string>();
const selection = reactive<{ id: number; choice: string }>({
  id: 0,
  choice: "",
});
const showDropdown = ref<boolean>(false);

const closeDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 500)
}
const filteredList = computed(() =>
  input.value
    ? items.filter((item: any) =>
        item[filter].toLowerCase().includes(input.value!.toLowerCase())
      )
    : items
);

const changeSelection = (id: number, choice: string) => {
  selection.id = id;
  selection.choice = choice;
  console.log(id);
  showDropdown.value = false;
};
</script>

<template>
  <div class="relative mb-4">
    <input
      @focus="showDropdown = true"
      @blur="closeDropdown"
      :placeholder="selection.choice ? selection.choice : placeholder"
      :class="[selection.choice ? 'placeholder-black': '']"
      class="appearance-none rounded-md py-1 px-2 border-2 border-gray-100 w-full"
      type="text"
      v-model="input"
    />
    <i class="absolute right-3 top-2 fa-solid fa-book"></i>
    <div
      v-show="showDropdown"
      class="absolute dropdown bg-white border cursor-pointer"
    >
      <div v-for="item in filteredList" :key="item[id]">
        <slot :id="item[id]" :item="item" :select="changeSelection"></slot>
      </div>
    </div>
  </div>
</template>
