import React from "react";
import { Todo } from "../model";
import Card from "./Card";
import styles from "./TodoList.module.css";

interface TodoListProps {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: TodoListProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.todos}>
				<span className={styles.heading}>Active tasks</span>
				{todos.map((todo) => (
					<Card todo={todo} todos={todos} setTodos={setTodos} key={todo.id} />
				))}
			</div>
			<div className={`${styles.todos} ${styles.completed}`}>
				<span className={styles.heading}>Completed tasks</span>
				{todos.map((todo) => (
					<Card todo={todo} todos={todos} setTodos={setTodos} key={todo.id} />
				))}
			</div>
		</div>
	);
};

export default TodoList;
