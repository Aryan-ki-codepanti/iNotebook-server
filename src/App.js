import { BrowserRouter as Router , Route , Switch  } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
    return (
	<>
		<NoteState>
		<Router>
			<Navbar />
			<Alert type="warning" message="Padai karlo beta" />
			<div className="container">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/about">
						<About />
					</Route>
				</Switch>
			</div>
		</Router>
		</NoteState>
	</>)
};

export default App;
