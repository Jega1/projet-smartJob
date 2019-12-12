import React from "react";
import "./static/css/style.css";
import "./static/css/footer.css";
import "./static/css/parallax.css";
import "./static/css/Style1.css";
//import "./static/css/nav-bar.css";
import Nav from "./Components/Nav";
import Navbar from "./Components/Nav-bar";
import Header from "./Components/Header";

import Home from "./Screens/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CandidatInscription from "./Screens/Candidature/CandidatInscription";
import EnterpriseRegister from "./Screens/Enterprise/EnterpriseRegister";
import EnterpriseLogin from "./Screens/Enterprise/EnterpriseLogin";
import CreateAnnounce from "./Screens/Enterprise/CreateAnnounce";
import CandidatLogin from "./Screens/Candidature/CandidatLogin";
import CandidatDashboard from "./Screens/Candidature/CandidatDashboard";
import EnterpriseDashboard from "./Screens/Enterprise/EnterpriseDashboard";

function App() {
	return (
		<Router>
			<div>
				<Nav-bar />
				<Nav />
				{/* <Header/> */}

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
					<Route path="/CandidatDashboard">
						<CandidatDashboard />
					</Route>
					<Route path="/EnterpriseDashboard">
						<EnterpriseDashboard />
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
