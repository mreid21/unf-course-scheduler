<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import Option from '../types/option';

//TODO: add close dropdown on blur

interface Props {
  placeholder: string;
  items: any;
  filter: string;
  id: string;
  icon?: string;
  modelValue?: Option;
}

const { placeholder, items, filter, icon } = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const input = ref<string>();

const clearInput = () => (input.value = '');

const showDropdown = ref<boolean>(false);

const selection = ref<Option>(undefined);

watch(selection, () => {
  emit('update:modelValue', selection.value);
});

const changeSelection = (id: number, value: string) => {
  clearInput();
  selection.value = { id, value };
  showDropdown.value = false;
};

const clearSelection = () => {
  if (selection.value) {
    selection.value = undefined;
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
      @focus="showDropdown = true"
      @blur="showDropdown = false"
      @keydown.esc="clearInput"
      :placeholder="modelValue ? modelValue.value : placeholder"
      :class="[modelValue ? 'placeholder-black' : '']"
      class="appearance-none rounded-md py-1 px-2 border-2 border-gray-100 w-full"
      type="text"
      v-model="input"
    />
    <font-awesome-icon
      @click="clearSelection"
      class="absolute right-3 top-2 cursor-pointer"
      :icon="modelValue ? 'window-close' : icon"
    ></font-awesome-icon>
    <div
      v-show="showDropdown"
      :class="[filteredList.length > 8 ? 'dropdown-scroll' : '']"
      class="absolute dropdown bg-white border"
    >
      <div v-for="item in filteredList" :key="item[id]" class="overflow-hidden">
        <slot :id="item[id]" :item="item" :select="changeSelection"></slot>
      </div>
    </div>
  </div>
</template>
