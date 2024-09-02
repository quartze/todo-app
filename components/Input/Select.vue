<template>
  <div class="ta-select">
    <select @change="handleChange($event.target.value)" name="" id="">
      <template v-for="option in props.data" :key="option.value">
        <option :value="option.value">{{ option.label }}</option>
      </template>
    </select>
  </div>
</template>

<script lang="ts" setup>
import type { SelectProps } from '~/types/interfaces';

const props = defineProps<SelectProps>();

const emits = defineEmits(["update:modelValue"]);

const handleChange = (event: String) => {
  emits("update:modelValue", event);
};

</script>

<style scoped>
.ta-select {
  @apply w-full;
}

.ta-select select {
		@apply w-full px-6 py-4 rounded-lg text-indigo-500 uppercase text-sm transition-colors border-indigo-500 border font-bold;
}
</style>