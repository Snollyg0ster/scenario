import { ScenarioPart } from "../../models";
import { download } from "../../utils";

interface Props {
	scenario: ScenarioPart[];
	genre: string;
}

const Scenario = (props: Props) => {
	const { scenario, genre } = props;

	const text = scenario.reduce(
		(acc, { str, user }) => acc + `[ ${user} ]:  ${str}\n\n\n\n`,
		""
	);

	const save = () => download(text, `сценарий - ${genre}`, "file");
	return (
		<div>
			<div style={{ paddingLeft: 20 }}>
				<h3 className="text textLeft shadow">Вот что вышло....</h3>
			</div>
			<div
				style={{
					textAlign: "left",
					maxHeight: "calc(100vh - 200px)",
					overflowY: "auto",
					padding: 10,
					borderRadius: 15,
					background: "#00000022",
				}}
			>
				{scenario.map((scen, i) => (
					<div
						key={i}
						className="text"
						style={{ display: "flex", marginBottom: 15 }}
					>
						<div
							style={{
								marginRight: 15,
								width: 50,
							}}
						>
							{scen.user}
						</div>
						<div>{scen.str}</div>
					</div>
				))}
			</div>
			<div
				style={{
					height: 50,
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-end",
				}}
			>
				<div className="button submitTextGrad" onClick={save}>
					Выгрузить историю
				</div>
			</div>
		</div>
	);
};

export default Scenario;
