import "./App.scss";
import { Player } from "./components/Player/Player";

function App() {
	return (
		<div className="app-container">
			<h1 className="title">Audio player</h1>
			<hr />
			<Player />
		</div>
	);
}

export default App;
