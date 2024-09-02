<template>
	<button
		@click="handleClick"
		class="ta-button"
	>
		<slot />
	</button>
</template>

<script lang="ts" setup>
	const events = defineEmits(["click"]);

	const handleClick = () => {
		events("click");
	};
</script>

<style scoped>
	.ta-button {
		@apply px-6 py-4 rounded-lg bg-indigo-500 text-white uppercase text-sm transition-colors hover:bg-transparent hover:text-indigo-500 border-indigo-500 border font-bold w-full lg:w-auto flex items-center justify-center;
	}
</style>
