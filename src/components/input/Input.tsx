import { ChangeEvent, useEffect, useState } from "react";
import { ScenarioPart } from "../../models";

interface Props {
	users: string[];
	addScenario: (str: string, user: string) => void;
	scenario: ScenarioPart[];
}

const Input = (props: Props) => {
	const { users, addScenario, scenario } = props;
	const [input, setInput] = useState("");
	const [done, setDone] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentUser, setCurrentUser] = useState("");

	useEffect(() => {
		users.length && setCurrentUser(users[0]);
	}, [users]);

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setInput(e.target.value);

	const onDone = () => {
		setDone(true);
		input.length && addScenario(input, currentUser);
	};

	const finalize = () => {
		if (currentIndex + 1 === users.length) {
			setCurrentIndex(0);
			setCurrentUser(users[0]);
		} else {
			setCurrentUser(users[currentIndex + 1]);
			setCurrentIndex((index) => index + 1);
		}
		setDone(false);
	};

	return (
		<div className="users">
			{!done ? (
				<div>
					<div className="scenario text">
						<div
							style={{
								display: "flex",
								whiteSpace: "pre-wrap",
								marginBottom: 25,
							}}
						>
							Очередь игрока{" "}
							<div
								style={{
									fontSize: 18,
									textShadow: "1px 1px 2px #ddd",
									marginTop: -2,
								}}
							>
								{currentUser}
							</div>
						</div>
						{scenario.length ? (
							<div
								style={{
									marginBottom: 20,
									whiteSpace: "pre-wrap",
								}}
							>
								Предыдущий игрок ({" "}
								{scenario[scenario.length - 1].user} ) написал:
								<div style={{ height: 10 }} />
								<div>{scenario[scenario.length - 1].str}</div>
							</div>
						) : (
							<div style={{ marginBottom: 20 }}>Вы первый!</div>
						)}
					</div>
					<div style={{ display: "flex", alignItems: "flex-start" }}>
						<textarea
							onChange={onChange}
							className="input textArea"
							rows={5}
						/>
						<button
							onClick={onDone}
							className="button submitTextGrad"
						>
							Готово
						</button>
					</div>
				</div>
			) : (
				<button onClick={finalize} className="button submitTextGrad">
					Следующий
				</button>
			)}
		</div>
	);
};

export default Input;
