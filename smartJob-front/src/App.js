import React from "react";
import "./static/css/style.css";
import Nav from "./Components/Nav";

import Home from "./Screens/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CandidatInscription from "./Screens/Candidature/CandidatInscription";
import EnterpriseRegister from "./Screens/Enterprise/EnterpriseRegister";
import EnterpriseLogin from "./Screens/Enterprise/EnterpriseLogin";
import CreateAnnounce from "./Screens/Enterprise/CreateAnnounce";
import CandidatLogin from "./Screens/Candidature/CandidatLogin";

function App() {
	return (
		<Router>
			<div>
				<Nav />

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/inscription">
						<CandidatInscription />
					</Route>
					<Route path="/registerEntreprise">
						<EnterpriseRegister />
					</Route>
					<Route path="/registerAnnounce">
						<CreateAnnounce />
					</Route>
					<Route path="/CandidatLogin">
						<CandidatLogin />
					</Route>
					<Route path="/EntrepriseLogin">
						<EnterpriseLogin />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
