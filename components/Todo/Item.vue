<template>
  <div class="todo-item" :class="{ 'todo-item-done': isEnd }">
    <div class="todo-item-left">
      <InputCheckbox @change="handleUpdateTask" v-model="isEnd" />
    </div>
    <div class="todo-item-label">
      <input @change="handleUpdateTask" type="text" class="todo-label" v-model="name">
    </div>

    <div class="todo-item-priority">
      <TodoPriority @change-priority="handlePriority" :default-priority="priority" />
    </div>

    <div class="todo-item-settings">
      <InputButton @click="removeTask(props.taskId)">
        <Icon icon="tabler:trash-filled" />
      </InputButton>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useTodoStore } from "~/store/todo";
import { E_Priorities } from "~/types/enum";
import type { TodoItemProps } from "~/types/interfaces";

const props = defineProps<TodoItemProps>();

const name = ref<string>(props.name);
const priority = ref<E_Priorities>(props.priority);
const isEnd = ref<boolean>(props.isEnd);

const store = useTodoStore();
const { updateTask, removeTask } = store;

const handlePriority = (val: E_Priorities) => {
  priority.value = val;
  updateTask({
    id: props.taskId,
    name: name.value,
    priority: priority.value,
    isEnd: isEnd.value
  })
}

const handleUpdateTask = () => {
  updateTask({
    id: props.taskId,
    name: name.value,
    priority: priority.value,
    isEnd: isEnd.value
  })
}
</script>

<style sccoped>
.todo-item {
  @apply lg:flex items-center gap-2 w-full transition-opacity border border-gray-200 rounded-lg p-4 lg:border-none lg:p-0;
}

.todo-item-label {
  @apply w-full;
}

.todo-label {
  @apply w-full text-2xl text-indigo-500 bg-transparent lg:text-left lg:my-0 text-center my-4;
}

.todo-item-done {
  @apply opacity-50 relative after:h-[1px] after:lg:block after:hidden after:content-[''] after:bg-indigo-500 after:-z-10 after:w-full after:absolute after:top-1/2 after:-translate-y-1/2;
}

.todo-item-settings {
  @apply opacity-100 my-4 lg:opacity-0 transition-opacity;
}

.todo-item:hover .todo-item-settings {
  @apply opacity-100;
}

.todo-item-priority {
  @apply mx-10;
}

.todo-item-left {
  @apply lg:m-0 lg:block lg:w-auto flex justify-center my-4 w-full;
}
</style>