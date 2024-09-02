import { defineStore } from 'pinia'
import type { I_Store_Todo } from '~/types/stores'

export const useTodoStore = defineStore({
	id: "myTodoStore",
	state: () =>
		<I_Store_Todo>{
			name: "Todo App",
			sort: I_Store_Todo_Sort.PRIORITY,
      tasks: []
		},
  actions: {
    fetchTasks() {
      const data = localStorage.getItem("todos");

      if (data) {
        const parsedData: I_Store_Todo = JSON.parse(data);
        this.tasks = parsedData.tasks;
        this.name = parsedData.name;
        this.sort = parsedData.sort;
      } else {
        localStorage.setItem("todos", JSON.stringify({}));
      }
    },

    getTasks() {
      switch(this.sort) {
        case I_Store_Todo_Sort.PRIORITY:
          return this.tasks.sort((a, b) => this.getPriorityOrder(a.priority) - this.getPriorityOrder(b.priority));
        case I_Store_Todo_Sort.AZ:
          return this.tasks.sort((a, b) => a.name.localeCompare(b.name));
        case I_Store_Todo_Sort.ZA:
          return this.tasks.sort((a, b) => b.name.localeCompare(a.name));
        case I_Store_Todo_Sort.START:
          return this.tasks.sort((a, b) => Number(a.isEnd) - Number(b.isEnd));
        case I_Store_Todo_Sort.END:
          return this.tasks.sort((a, b) => Number(b.isEnd) - Number(a.isEnd));
        default:
          return this.tasks
      }

    },

    getPriorityOrder(priority: E_Priorities) {
      switch (priority) {
        case E_Priorities.High:
          return 0;
        case E_Priorities.Medium:
          return 1;
        case E_Priorities.Low:
          return 2;
        default:
          return 3;
      }
    },

    saveTasks() {
      const data = {
        name: this.name,
        sort: this.sort,
        tasks: this.tasks
      };

      localStorage.setItem("todos", JSON.stringify(data));
    },

    setName(name: string) {
      this.name = name;
      this.saveTasks();
    },

    setSort(sort: I_Store_Todo_Sort) {
      this.sort = sort;
      this.saveTasks();
    },

    addTask() {
      const id = this.tasks.length + 1;
      this.tasks.push({
        id: id,
        name: "Write text of task",
        priority: E_Priorities.Low,
        isEnd: false
      });
      this.saveTasks();
    },

    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
    },

    updateTask(task: I_Store_Todo_Task) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      this.tasks[index] = task;
      this.saveTasks();
    },

    endTask(id: number) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.isEnd = true;
        this.saveTasks();
      }
    }
  },
});
