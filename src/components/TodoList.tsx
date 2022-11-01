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
	);
};

export default TodoList;
