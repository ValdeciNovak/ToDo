import type { ChangeEvent, InvalidEvent } from "react";
import { ToDoLogo } from "./assets/toDoLogo";
import { PlusCircle } from "phosphor-react";
import { NoTasks } from "./componets/noTasks";
import { Task } from "./componets/task";
import { useState } from "react";

interface TaskType {
	id: number;
	text: string;
	isCompleted: boolean;
}

function App() {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [taskText, setTaskText] = useState("");
	const [taskId, setTaskId] = useState(0);

	function handleAddTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("");
		setTaskText(event.target.value);
	}

	function handleAddTask() {
		setTasks((prevTasks) => [
			...prevTasks,
			{
				id: taskId,
				text: taskText,
				isCompleted: false,
			},
		]);
		setTaskId((idTask) => {
			return idTask + 1;
		});
		setTaskText("");
	}
	function handleToggleTask(taskId: number) {
		setTasks((prevTasks) =>
			prevTasks.map((task) => {
				if (task.id === taskId) {
					return {
						...task,
						isCompleted: !task.isCompleted,
					}; // Inverte o estado
				}
				return task;
			}),
		);

		orderTasks();
	}

	function orderTasks() {
		setTasks((prevTasks) => {
			const taskCompleted = prevTasks.filter((task) => task.isCompleted);
			const taskInconpleted = prevTasks.filter((task) => !task.isCompleted);
			return [...taskInconpleted, ...taskCompleted];
		});
	}
	

	function handleDeleteTask(taskId: number) {
		console.log("entrou");
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
	}

	function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("Esse campo é obrigatório");
	}

	const isNewTaskEmpty = taskText.length === 0;
	const completedTasks = tasks.filter((task) => task.isCompleted).length;

	return (
		<div className="min-w-screen min-h-screen overflow-auto bg-[#1A1A1A]">
			<div className="flex flex-col items-center">
				<header className="w-full bg-[#0D0D0D] h-[12.5rem] flex justify-center items-center">
					<ToDoLogo />
				</header>
				<form className="flex h-full flex-row mt-[-2rem]">
					<textarea
						name="task"
						className="text-[#808080] w-[39.875rem] whitespace-nowrap resize-none overflow-hidden pl-4 h-[3.375rem] font-sans mr-2 p-4 text border-none focus:ring-2 focus:outline-none focus:border-[#1E6F9F] bg-[#262626] rounded-lg"
						placeholder="Adicione uma nova tarefa"
						value={taskText}
						onChange={handleAddTaskChange}
						onInvalid={handleNewTaskInvalid}
						required
					/>

					<button
					type="button"
						title="Criar Tarefa"
						disabled={isNewTaskEmpty}
						onClick={handleAddTask}
						className="flex items-center disabled:opacity-50 disabled:cursor-not-allowed justify-evenly w-[5.625rem] h-[3.25rem] bg-[#1E6F9F] text-[#F2F2F2] text-sm font-bold leading-[140%] rounded-lg"
					>
						Criar
						<PlusCircle size={18} />
					</button>
				</form>
				<div className="w-[46rem] pb-8 mt-[4rem]">
					<div className="w-full flex justify-between">
						<div>
							<span className="text-[#4EA8DE] text-sm font-bold font-sans mr-2">
								Tarefas criadas
							</span>
							<span className="w-[1.5625rem] h-[1,1875rem] text-xs font-bold font-sans rounded-full px-2 py-[0.125rem] bg-[#333333] text-[#D9D9D9]">
								{tasks.length}
							</span>
						</div>
						<div>
							<span className="rounded-full text-[#8284FA] text-sm font-sans font-bold mr-2">
								Concluídas
							</span>
							<span className="w-[1.5625rem] h-[1,1875rem] text-xs font-bold font-sans rounded-full px-2 py-[0.125rem] bg-[#333333] text-[#D9D9D9]">
								{completedTasks}
							</span>
						</div>
					</div>

					{tasks.length >= 1 ? (
						tasks.map((task) => (
							<Task
								key={task.id}
								task={task.text}
								isChecked={task.isCompleted}
								onToggle={() => handleToggleTask(task.id)}
								onDelete={() => handleDeleteTask(task.id)}
							/>
						))
					) : (
						<NoTasks />
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
