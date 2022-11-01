import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import styles from "./Card.module.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

interface CardProps {
	idx: number;
	todo: Todo;
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	isDone?: boolean;
}

const Card = ({ idx, todo, isDone, setTodos }: CardProps) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodoText, setEditTodoText] = useState<string>(todo.todoText);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const handleDelete = (id: number) =>
		setTodos((prev) => prev.filter((el) => el.id !== id));

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		setTodos((prev) =>
			prev.map((el) => (el.id === id ? { ...el, todoText: editTodoText } : el))
		);
		setEdit(false);
	};

	return (
		<Draggable draggableId={todo.id.toString()} index={idx}>
			{(provided, snapshot) => (
				<form
					className={`${styles.wrapper} ${
						snapshot.isDragging && styles.dragging
					}`}
					onSubmit={(e) => handleEdit(e, todo.id)}
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
				>
					{edit ? (
						<input
							className={styles["input-field"]}
							value={editTodoText}
							ref={inputRef}
							onChange={(e) => setEditTodoText(e.target.value)}
							maxLength={36}
						/>
					) : isDone ? (
						<s className={styles["todo-text"]}>{todo.todoText}</s>
					) : (
						<span className={styles["todo-text"]}>{todo.todoText}</span>
					)}

					<div className={styles["icons-wrapper"]}>
						{!isDone && (
							<span
								className={styles.icon}
								onClick={() => !edit && setEdit(true)}
							>
								<AiFillEdit />
							</span>
						)}

						<span className={styles.icon} onClick={() => handleDelete(todo.id)}>
							<AiFillDelete />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
};

export default Card;
