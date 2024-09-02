<template>
  <div class="ta-checkbox-wrapper">
      <input type="hidden" :value="isSelected">
      <div @click="handleCheckChange" class="ta-checkbox" :class="{ active: isSelected }">
          <Icon v-if="isSelected" icon="mingcute:check-fill" />
      </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import type { CheckboxProps } from "~/types/interfaces";

const props = defineProps<CheckboxProps>();

const emit = defineEmits(["update:modelValue", "change"]);

const isSelected = ref(props.modelValue);

const handleCheckChange = () => {
  isSelected.value = !isSelected.value;

  handleChange();
}

const handleChange = () => {
  emit("update:modelValue", isSelected.value);
  emit("change", isSelected.value);
};

</script>

<style scoped>
.ta-checkbox {
  @apply border cursor-pointer border-indigo-500 rounded-lg w-8 h-8 flex items-center justify-center;
}

.ta-checkbox.active {
  @apply bg-indigo-500 text-white; 
}
</style>