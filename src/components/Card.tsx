import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import styles from "./Card.module.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface CardProps {
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Card = ({ todo, todos, setTodos }: CardProps) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodoText, setEditTodoText] = useState<string>(todo.todoText);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const handleDelete = (id: number) =>
		setTodos((prev) => prev.filter((el) => el.id !== id));

	const handleComplete = (id: number) =>
		setTodos((prev) =>
			prev.map((el) => (el.id === id ? { ...el, isDone: !el.isDone } : el))
		);

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		setTodos((prev) =>
			prev.map((el) => (el.id === id ? { ...el, todoText: editTodoText } : el))
		);
		setEdit(false);
	};

	return (
		<form className={styles.wrapper} onSubmit={(e) => handleEdit(e, todo.id)}>
			{edit ? (
				<input
					className={styles["input-field"]}
					value={editTodoText}
					ref={inputRef}
					onChange={(e) => setEditTodoText(e.target.value)}
					maxLength={36}
				/>
			) : todo.isDone ? (
				<s className={styles["todo-text"]}>{todo.todoText}</s>
			) : (
				<span className={styles["todo-text"]}>{todo.todoText}</span>
			)}

			<div className={styles["icons-wrapper"]}>
				<span
					className={styles.icon}
					onClick={() => !edit && !todo.isDone && setEdit(true)}
				>
					<AiFillEdit />
				</span>
				<span className={styles.icon} onClick={() => handleDelete(todo.id)}>
					<AiFillDelete />
				</span>
				<span className={styles.icon} onClick={() => handleComplete(todo.id)}>
					<MdDone />
				</span>
			</div>
		</form>
	);
};

export default Card;
