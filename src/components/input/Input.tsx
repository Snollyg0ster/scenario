import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { genres } from "../../defaults";
import { ScenarioPart } from "../../models";
import { getRandomItem } from "../../utils";

interface Props {
	users: string[];
	addScenario: (str: string, user: string) => void;
	scenario: ScenarioPart[];
	genre: string;
	updateGenre: (newGenre: string) => void;
}

const Input = (props: Props) => {
	const { users, addScenario, scenario, genre, updateGenre } = props;
	const [input, setInput] = useState("");
	const [done, setDone] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentUser, setCurrentUser] = useState("");

	useEffect(() => {
		updateGenre(getRandomItem(genres));
	}, []);

	useEffect(() => {
		users.length && setCurrentUser(users[0]);
	}, [users]);

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setInput(e.target.value);

	const onDone = () => {
		setDone(true);
		if (input.length) {
			addScenario(input, currentUser);
			setInput("");
		}
	};

	const finalize = (e: MouseEvent) => {
		e.stopPropagation();
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
		<>
			<div className="genre shadow">Ваш жанр: {genre}</div>
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
										marginTop: -2,
									}}
									className="shadow"
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
									{scenario[scenario.length - 1].user} )
									написал:
									<div
										style={{
											height: 10,
										}}
									/>
									<div
										style={{
											maxHeight: 400,
											overflowY: "scroll",
										}}
									>
										{scenario[scenario.length - 1].str}
									</div>
								</div>
							) : (
								<div style={{ marginBottom: 20 }}>
									Вы первый!
								</div>
							)}
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "flex-start",
							}}
						>
							<textarea
								value={input}
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
					<div style={{ display: "flex", justifyContent: "center" }}>
						<button
							onClick={finalize}
							className="button submitTextGrad"
						>
							Следующий
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Input;
