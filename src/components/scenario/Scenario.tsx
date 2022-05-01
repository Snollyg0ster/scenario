import { ScenarioPart } from "../../models";

interface Props {
	scenario: ScenarioPart[];
}

const Scenario = (props: Props) => {
	const { scenario } = props;
	return (
		<div>
			<div style={{ paddingLeft: 20 }}>
				<h3 className="text textLeft">Вот что вышло....</h3>
			</div>
			<div
				style={{
					textAlign: "left",
					maxHeight: "calc(100vh - 200px)",
					overflowY: "auto",
					padding: 10,
					border: "2px solid rgba(0, 0, 0, 0.2)",
					borderRadius: 15,
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
		</div>
	);
};

export default Scenario;
