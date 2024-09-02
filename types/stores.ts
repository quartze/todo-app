export interface I_Store_Todo {
	name: string;
	sort: I_Store_Todo_Sort;
	tasks: I_Store_Todo_Task[];
}

export enum I_Store_Todo_Sort {
	DEFAULT = "default",
	PRIORITY = "priority",
	AZ = "az",
	ZA = "za",
	START = "start",
	END = "end",
}

export interface I_Store_Todo_Task {
	id?: number;
	name: string;
	priority: E_Priorities;
	isEnd: boolean;
}
