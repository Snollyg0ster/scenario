import { ChangeEvent, KeyboardEvent, useState } from "react";
import { getShuffledArray } from "../../utils";

interface Props {
	users: string[];
	addUser: (user: string) => void;
	deleteUser: (user: string) => void;
	updateUsers: (users: string[]) => void;
}

const Users = (props: Props) => {
	const { users, addUser, deleteUser, updateUsers } = props;
	const [input, setInput] = useState("");

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setInput(e.target.value);

	const onAdd = () => {
		if (input.length < 18 && input.length > 2 && !users.includes(input)) {
			addUser(input);
			setInput("");
		}
	};

	const shuffleUsers = () => updateUsers(getShuffledArray(users));

	const onDelete = (user: string) => () => deleteUser(user);
	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
		e.code === "Enter" && onAdd();

	return (
		<div className="users">
			<h3 className="text">Добавить игрока</h3>
			<div className="usersCont">
				{users.map((user, i) => (
					<div className="user" key={user}>
						<div>{i + 1}.</div>
						<div>{user}</div>
						<div className="delete" onClick={onDelete(user)}>
							удалить
						</div>
					</div>
				))}
			</div>
			{users.length > 1 && (
				<div className="button" onClick={shuffleUsers}>
					Перемешать
				</div>
			)}
			<div>
				<input
					value={input}
					onChange={onChange}
					className="input"
					onKeyDown={onKeyDown}
				/>
				<button onClick={onAdd} className="button submitTextGrad">
					Добавить
				</button>
			</div>
		</div>
	);
};

export default Users;
