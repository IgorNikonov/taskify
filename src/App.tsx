import React, { useState } from "react";
import InputField from "./components/InputField";
import "./app.css";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
	const [todoText, setTodoText] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (todoText)
			setTodos((prev) => [
				...prev,
				{ id: Date.now(), todoText, isDone: false },
			]);
		setTodoText("");
	};

	return (
		<div className='app'>
			<span className='logo'>Taskify</span>
			<InputField
				todoText={todoText}
				setTodoText={setTodoText}
				handleAdd={handleAdd}
			/>
			<TodoList todos={todos} setTodos={setTodos} />
		</div>
	);
};

export default App;
