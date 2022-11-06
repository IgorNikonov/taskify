import React, { useRef, useEffect } from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
	todoText: string;
	setTodoText: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todoText, setTodoText, handleAdd }: InputFieldProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
		console.log("asdlkfj");
	}, []);

	return (
		<form
			className={styles.wrapper}
			onSubmit={(e) => {
				handleAdd(e);
				inputRef.current?.focus();
			}}
		>
			<input
				ref={inputRef}
				type='input'
				placeholder='Enter a task'
				className={styles["input-field"]}
				value={todoText}
				onChange={(e) => setTodoText(e.target.value)}
				maxLength={36}
			/>
			<button type='submit' className={styles["submit-btn"]}>
				Go
			</button>
		</form>
	);
};

export default InputField;
