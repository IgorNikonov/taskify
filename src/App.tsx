import React, { useState } from "react";
import InputField from "./components/InputField";
import "./App.css";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
	const [todoText, setTodoText] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (todoText) setTodos((prev) => [...prev, { id: Date.now(), todoText }]);
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
