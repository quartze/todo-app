<template>
	<NuxtPage />
</template>

<script setup>
	import { useTodoStore } from "./store/todo";

	onMounted(() => {
		useTodoStore().fetchTasks();
	});
</script>
