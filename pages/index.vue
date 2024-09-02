<template>
	<div class="todo-app container mx-auto">
		<input
			type="text"
			class="todo-title"
			:value="todoName"
			@change="setName($event.target.value)"
		/>
		<div class="ta-cta-bar">
			<div class="ta-cta-left">
				<InputButton @click="addTask">Add new task</InputButton>
			</div>
			<div class="ta-cta-right">
				<InputSelect
					:data="filterData"
					name="filter"
					@change="handleSort"
					v-model="sort"
				/>
			</div>
		</div>
		<div class="ta-todo-list-wrapper">
			<ul class="todo-list">
				<template
					v-for="(todo, i) in todos"
					:key="todo.id"
				>
					<li>
						<TodoItem
							:name="todo.name"
							:taskId="todo.id ? todo.id : i"
							:priority="todo.priority"
							:isEnd="todo.isEnd"
						/>
					</li>
				</template>
			</ul>
		</div>
		<div
			class="ta-todo-list-wrapper-empty"
			v-if="!todos.length"
		>
			<Icon icon="mingcute:sad-fill" />
			<h2>
				You don't have any tasks right now.
				<a
					href="#"
					title="Add new"
					@click="addTask"
					>Add new!</a
				>
			</h2>
		</div>

		<div class="github">
			<a
				href="https://github.com/quartze/todo-app"
				target="_blank"
				><Icon icon="mdi:github"
			/></a>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { I_Store_Todo_Sort } from "#imports";
	import { Icon } from "@iconify/vue";
	import type { SelectDataOptions } from "~/components/Input/Select.vue";
	import { useTodoStore } from "~/store/todo";

	const filterData: SelectDataOptions[] = [
		{
			label: "Default",
			value: "default",
		},
		{
			label: "Sort by priority",
			value: "priority",
		},
		{
			label: "Sort by A - Z",
			value: "az",
		},
		{
			label: "Sort by Z - A",
			value: "za",
		},
		{
			label: "Sort by task end",
			value: "end",
		},
		{
			label: "Sort by task in progress",
			value: "start",
		},
	];

	// Store
	const todoStore = useTodoStore();
	const todos = computed(() => todoStore.getTasks());
	const todoName = computed(() => todoStore.name);
	const todoSort = computed(() => todoStore.sort);

	const { setName, addTask, setSort } = todoStore;

	// Var
	const sort = ref<I_Store_Todo_Sort>(todoSort.value);

	const handleSort = () => {
		setSort(sort.value);
	};
</script>

<style scoped>
	.ta-cta-bar {
		@apply flex flex-col gap-4 lg:flex-row items-center justify-between;
	}

	.ta-cta-right {
		@apply flex gap-2 lg:w-auto w-full;
	}

	.ta-todo-list-wrapper {
		@apply my-10;
	}

	.todo-list {
		@apply flex gap-2 flex-col;
	}

	.todo-title {
		@apply font-bold text-3xl mt-24 lg:mt-0 mb-24 text-center w-full block;
	}

	.ta-todo-list-wrapper-empty {
		@apply text-center mx-auto text-2xl text-indigo-600 font-bold;
	}

	.ta-todo-list-wrapper-empty svg {
		@apply mx-auto text-6xl mb-4;
	}

	.ta-todo-list-wrapper-empty a {
		@apply underline;
	}

	.ta-cta-left {
		@apply lg:w-auto w-full;
	}

	.github {
		@apply text-center text-xl flex items-center justify-center text-gray-500 hover:text-indigo-500 transition-colors my-4;
	}
</style>
