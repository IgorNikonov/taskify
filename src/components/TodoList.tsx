import React from "react";
import { Todo } from "../model";
import Card from "./Card";
import styles from "./TodoList.module.css";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

interface TodoListProps {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
	todos,
	setTodos,
	completedTodos,
	setCompletedTodos,
}: TodoListProps) => {
	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		let add,
			active = todos,
			completed = completedTodos;

		if (source.droppableId === "active-todos") {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = completed[source.index];
			completed.splice(source.index, 1);
		}

		if (destination.droppableId === "active-todos") {
			active.splice(destination.index, 0, add);
		} else {
			completed.splice(destination.index, 0, add);
		}

		setCompletedTodos(completed);
		setTodos(active);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.container}>
				<Droppable droppableId='active-todos'>
					{(provided, snapshot) => (
						<div
							className={`
								${styles.todos} ${snapshot.isDraggingOver && styles.dragactive}
							`}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<span className={styles.heading}>Active tasks</span>
							{todos.map((todo, idx) => (
								<Card idx={idx} todo={todo} setTodos={setTodos} key={todo.id} />
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<Droppable droppableId='completed-todos'>
					{(provided, snapshot) => (
						<div
							className={`
								${styles.todos} ${styles.completed} ${
								snapshot.isDraggingOver && styles.dragcompleted
							}
							`}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<span className={styles.heading}>Completed tasks</span>
							{completedTodos.map((todo, idx) => (
								<Card
									idx={idx}
									todo={todo}
									setTodos={setCompletedTodos}
									isDone
									key={todo.id}
								/>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
};

export default TodoList;
