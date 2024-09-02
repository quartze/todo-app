<template>
	<div
		class="todo-tag"
		ref="tagWrapper"
	>
		<div
			class="selected-tag tag-item"
			@click="toggleTagChooser"
			:class="{
				'tag--high': tag === 'High',
				'tag--medium': tag === 'Medium',
				'tag--low': tag === 'Low',
			}"
		>
			{{ tag }}
		</div>

		<div
			class="tags-dropdown-wrapper"
			v-if="displayTagChooser"
		>
			<ul class="tags-dropdown">
				<li
					@click="changeTag(E_Priorities.High)"
					class="tag-item tag--high"
				>
					High
				</li>
				<li
					@click="changeTag(E_Priorities.Medium)"
					class="tag-item tag--medium"
				>
					Medium
				</li>
				<li
					@click="changeTag(E_Priorities.Low)"
					class="tag-item tag--low"
				>
					Low
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted, onBeforeUnmount } from "vue";
	import { E_Priorities } from "~/types/enum";
	import type { PriorityProps } from "~/types/interfaces";

	const props = defineProps<PriorityProps>();
	const emits = defineEmits(["changePriority"]);

	// Variables
	const tag = ref(props.defaultPriority || E_Priorities.Medium);
	const displayTagChooser = ref(false);
	const tagWrapper = ref<HTMLElement | null>(null);

	// Methods
	const toggleTagChooser = () => {
		displayTagChooser.value = !displayTagChooser.value;
	};

	const changeTag = (newTag: E_Priorities) => {
		tag.value = newTag;
		emits("changePriority", newTag);
		displayTagChooser.value = false; // Close dropdown after selection
	};

	// Handle click outside to close the dropdown
	const handleClickOutside = (event: MouseEvent) => {
		if (tagWrapper.value && !tagWrapper.value.contains(event.target as Node)) {
			displayTagChooser.value = false;
		}
	};

	// Add and remove event listeners
	onMounted(() => {
		document.addEventListener("click", handleClickOutside);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutside);
	});
</script>

<style scoped>
	.tag-item {
		@apply text-xs cursor-pointer font-bold uppercase lg:py-1 py-4 text-center px-3 rounded-lg;
	}

	.todo-tag {
		@apply relative;
	}

	.tag-item.tag--high {
		@apply bg-red-200 text-red-600;
	}

	.tag-item.tag--medium {
		@apply bg-yellow-200 text-yellow-600;
	}

	.tag-item.tag--low {
		@apply bg-green-200 text-green-600;
	}

	.tags-dropdown-wrapper {
		@apply absolute w-full lg:w-auto p-2 z-10 top-8 right-0 border border-gray-200 bg-white rounded-lg;
	}

	.tags-dropdown {
		@apply flex flex-col gap-2;
	}
</style>
