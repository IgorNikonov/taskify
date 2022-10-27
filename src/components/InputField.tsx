import React, { useRef } from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
	todoText: string;
	setTodoText: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todoText, setTodoText, handleAdd }: InputFieldProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className={styles.wrapper}
			onSubmit={(e) => {
				handleAdd(e);
				inputRef.current?.blur();
			}}
		>
			<input
				ref={inputRef}
				type='input'
				placeholder='Enter a task'
				className={styles["input-field"]}
				value={todoText}
				onChange={(e) => setTodoText(e.target.value)}
			/>
			<button type='submit' className={styles["submit-btn"]}>
				Go
			</button>
		</form>
	);
};

export default InputField;
