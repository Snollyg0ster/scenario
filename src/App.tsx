import { useState } from "react";
import "./App.css";
import Input from "./components/input";
import Scenario from "./components/scenario";
import Users from "./components/users";
import { funnyImageURL } from "./defaults";
import { useSyncStorage } from "./hooks";
import { ScenarioPart } from "./models";

const pages = ["users", "input", "result"];

function App() {
	const [users, setUsers] = useState<string[]>([]);
	const [scenario, setScenario] = useState<ScenarioPart[]>([]);
	const [page, setPage] = useState(pages[0]);
	const [genre, setGenre] = useState("");

	useSyncStorage("users", users, setUsers);

	const addUser = (user: string) => setUsers([...users, user]);
	const deleteUser = (user: string) =>
		setUsers(users.filter((u) => u !== user));
	const updateUsers = (users: string[]) => setUsers(users);

	const changeScreen = () => {
		if (page === "users") setPage(pages[1]);
		if (page === "input") setPage(pages[2]);
		if (page === "result") {
			setScenario([]);
			setPage(pages[0]);
		}
	};

	const addString = (str: string, user: string) =>
		setScenario([...scenario, { str, user }]);
	const updateGenre = (newGenre: string) => setGenre(newGenre);

	const isDisabled = !(users.length > 1);

	return (
		<div className="App">
			<div className="content">
				{page === "users" && (
					<Users
						users={users}
						addUser={addUser}
						deleteUser={deleteUser}
						updateUsers={updateUsers}
					/>
				)}
				{page === "input" && (
					<Input
						users={users}
						addScenario={addString}
						scenario={scenario}
						genre={genre}
						updateGenre={updateGenre}
					/>
				)}
				{page === "result" && (
					<Scenario scenario={scenario} genre={genre} />
				)}
			</div>
			<button
				className="button submitGrad"
				onClick={changeScreen}
				disabled={isDisabled}
			>
				{page === "users" && "Начать новую игру"}
				{page === "input" && "Закончить"}
				{page === "result" && "Дальше"}
			</button>
			<div className="imgCont">
				<img src={funnyImageURL} alt="funnyImage" className="img" />
			</div>
		</div>
	);
}

export default App;
