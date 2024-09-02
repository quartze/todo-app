export interface PriorityProps {
    defaultPriority?: E_Priorities;
    dropdownDisabled: boolean
}

export interface CheckboxProps {
	modelValue: Boolean;
}

export interface SelectDataOptions {
	label: string;
	value: string;
}

export interface SelectProps {
    name: string;
    modelValue: string;
	data: SelectDataOptions[];
}

export interface TodoItemProps {
    taskId: number;
    name: string;
    priority: E_Priorities;
    isEnd: boolean;
}