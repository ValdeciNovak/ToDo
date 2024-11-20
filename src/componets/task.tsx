import { Check, Trash } from "phosphor-react";

interface TaskProps {
	task: string;
	isChecked: boolean;
	onToggle: () => void;
	onDelete: () => void;
}

export function Task({ task, isChecked, onToggle, onDelete }: TaskProps) {
	return (
		<div className="flex items-center me-4 bg-[#262626] mt-6 rounded-lg justify-between ">
			<label className="relative flex items-center space-x-2 cursor-pointer break-all">
				<input
					type="checkbox"
					checked={isChecked}
					onChange={onToggle}
					className="peer mx-3 appearance-none min-w-6 min-h-6 border-solid border-2 border-[#4EA8DE] rounded-full checked:bg-[#5E60CE] checked:border-none cursor-pointer"
				/>
				<Check className="absolute top-1/2 left-[1rem] transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[#F2F2F2] hidden peer-checked:block pointer-events-none" />
				<span className=" my-4 peer-checked:text-[#808080] text-[#F2F2F2] peer-checked:line-through">
					{task}
				</span>
			</label>
			<Trash
				onClick={onDelete}
				className="text-[#808080] m-3 min-w-6 min-h-6 cursor-pointer"
			/>
		</div>
	);
}
