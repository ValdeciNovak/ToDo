import { ClipBoard } from "../assets/clipBoard";

export function NoTasks() {
	return (
		<div className="w-full mt-[1.5rem] border-t rounded-lg border-[#333333]">
			<div className="flex flex-col justify-center items-center mt-16">
				<ClipBoard />
				<span className="font-sans text-xs font-bold text-[#808080] mt-4">
					Você ainda não tem tarefas cadastradas
				</span>
				<span className="font-sans text-xs text-[#808080]">
					Crie tarefas e organize seus itens a fazer
				</span>
			</div>
		</div>
	);
}
