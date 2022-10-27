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
		<div className={styles.wrapper}>
			{todos.map((todo) => (
				<Card todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
			))}
		</div>
		// <div className={styles.container}>
		// 	<div className={styles.active}>
		// 		<span className={styles.heading}>Active Todos</span>
		// 		{todos.map((todo) => (
		// 			<Card todo={todo} todos={todos} key={todo.id} setTodos={setTodos} />
		// 		))}
		// 	</div>
		// 	<div className={styles.done}>
		// 		<span className={styles.heading}>Active Todos</span>
		// 		{todos.map((todo) => (
		// 			<Card todo={todo} todos={todos} key={todo.id} setTodos={setTodos} />
		// 		))}
		// 	</div>
		// </div>
	);
};

export default TodoList;
