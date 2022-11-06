import React, { useEffect, useState } from "react";
import InputField from "./components/InputField";
import "./App.css";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
	const [todoText, setTodoText] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>(
		// @ts-ignore
		JSON.parse(localStorage.getItem("active")) || []
	);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>(
		// @ts-ignore
		JSON.parse(localStorage.getItem("completed")) || []
	);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (todoText) setTodos((prev) => [...prev, { id: Date.now(), todoText }]);
		setTodoText("");
	};

	useEffect(() => {
		localStorage.setItem("active", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className='app'>
			<span className='logo'>Taskify</span>
			<InputField
				todoText={todoText}
				setTodoText={setTodoText}
				handleAdd={handleAdd}
			/>
			<TodoList
				todos={todos}
				setTodos={setTodos}
				completedTodos={completedTodos}
				setCompletedTodos={setCompletedTodos}
			/>
		</div>
	);
};

export default App;
