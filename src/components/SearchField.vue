<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue';

//TODO: add close dropdown on blur

interface Props {
  placeholder: string;
  items: any;
  filter: string;
  id: string;
  icon?: string;
  modelValue?: string | number;
}

const { placeholder, items, filter, icon } = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

watchEffect(() => {
  emit('update:modelValue', selection.choice);
})

const input = ref<string>();
const clearInput = () => (input.value = '');

const showDropdown = ref<boolean>(false);

const openDropdown = () => {
  showDropdown.value = true;
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const selection = reactive<{ id: number; choice: string }>({
  id: 0,
  choice: '',
});

const changeSelection = (id: number, choice: string) => {
  clearInput();
  selection.id = id;
  selection.choice = choice;
  showDropdown.value = false;
  
};

const clearSelection = () => {
  if (selection.choice) {
    selection.id = 0;
    selection.choice = '';
  }
};

const filteredList = computed(() =>
  input.value
    ? items.filter((item: any) =>
        item[filter].toLowerCase().includes(input.value!.toLowerCase())
      )
    : items
);
</script>

<template>
  <div class="relative mb-4 w-full">
    <input
      @focus="openDropdown"
      @blur="closeDropdown"
      @keydown.esc="clearInput"
      :placeholder="selection.choice ? selection.choice : placeholder"
      :class="[selection.choice ? 'placeholder-black' : '']"
      class="appearance-none rounded-md py-1 px-2 border-2 border-gray-100 w-full"
      type="text"
      v-model="input"
    />
    <font-awesome-icon
      @click="clearSelection"
      class="absolute right-3 top-2 cursor-pointer"
      :icon="selection.choice ? 'window-close' : icon"
    ></font-awesome-icon>
    <div v-show="showDropdown" class="absolute dropdown bg-white border">
      <div v-for="item in filteredList" :key="item[id]" class="overflow-hidden">
        <slot :id="item[id]" :item="item" :select="changeSelection"></slot>
      </div>
    </div>
  </div>
</template>
