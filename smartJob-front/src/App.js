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
import ClientInscription from "./Screens/Client/ClientInscription";
import EnterpriseRegister from "./Screens/Enterprise/EnterpriseRegister";
import EnterpriseLogin from "./Screens/Enterprise/EnterpriseLogin";
import CreateAnnounce from "./Screens/Enterprise/CreateAnnounce";
import ClientLogin from "./Screens/Client/ClientLogin";
import ClientDashboard from "./Screens/Client/ClientDashboard";
import EnterpriseDashboard from "./Screens/Enterprise/EnterpriseDashboard";

function App() {
	let client = localStorage.getItem("client");
	let entreprise = localStorage.getItem("enterprise");
	if (client) {
		client = JSON.parse(client);
	}
	if (entreprise) {
		entreprise = JSON.parse(entreprise);
	}

	let renderNav = () => {
		if (client) {
			let panier = JSON.parse(localStorage.getItem("panier"));
			return <Nav user={client} panier={panier} />;
		} else {
			if (entreprise) {
				return <Nav user={entreprise} panier={null} />;
			} else {
				return <Nav user={null} panier={null} />;
			}
		}
	};
	return (
		<Router>
			<div>
				{renderNav()}
				{/* <Header/> */}

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/inscription">
						<ClientInscription />
					</Route>
					<Route path="/registerEntreprise">
						<EnterpriseRegister />
					</Route>
					<Route path="/registerAnnounce">
						<CreateAnnounce />
					</Route>
					<Route path="/ClientLogin">
						<ClientLogin />
					</Route>
					<Route path="/EntrepriseLogin">
						<EnterpriseLogin />
					</Route>
					<Route path="/ClientDashboard">
						<ClientDashboard />
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
