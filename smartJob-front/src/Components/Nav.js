import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";
//import { Col, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

export default class Nav extends Component {
	state = {
		open: false
	};

	toggle = () => {
		this.setState({ open: !this.state.open });
	};
	render() {
		return (
			<div>
				<nav className="menu">
					<h1 className="menu__logo">Smart job</h1>

					<div className="menu__right">
						<ul className="menu__list">
							<li className="menu__list-item">
								<Link className="menu__link menu__link--active" to="/">
									Home
								</Link>
							</li>
							<li className="menu__list-item">
								<Link className="menu__link" to="/EntrepriseLogin">
									Accès recruter
								</Link>
							</li>

							<li className="menu__list-item">
								<Link className="menu__link" to="/about">
									contact
								</Link>
							</li>

							<li className="menu__list-item">
								<Dropdown isOpen={this.state.open} toggle={this.toggle}>
									<DropdownToggle caret>Connexion</DropdownToggle>
									<DropdownMenu>
										<Link to="/CandidatLogin">
											<DropdownItem>Candidature</DropdownItem>
										</Link>

										<Link to="/registerAnnounce">
											<DropdownItem>Announce</DropdownItem>
										</Link>
										<Link to="/EntrepriseLogin">
											<DropdownItem>Entreprise</DropdownItem>
										</Link>
										<Link to="/CandidatDashboard">
											<DropdownItem>Candidature dashboard</DropdownItem>
										</Link>
										<Link to="/login">
											<DropdownItem>login</DropdownItem>
										</Link>
									</DropdownMenu>
								</Dropdown>
							</li>
						</ul>
					</div>
				</nav>
			</div>

			// <nav
			// 	class="navbar navbar-expand-lg navbar-light "
			// 	style={{ backgroundColor: "rgb(72, 1, 475)", TextColor: "white" }}
			// >
			// 	<a class="navbar-brand" href="#">
			// 		Smart Job
			// 	</a>
			// 	<button
			// 		class="navbar-toggler"
			// 		type="button"
			// 		data-toggle="collapse"
			// 		data-target="#navbarNavDropdown"
			// 		aria-controls="navbarNavDropdown"
			// 		aria-expanded="false"
			// 		aria-label="Toggle navigation"
			// 	>
			// 		<span class="navbar-toggler-icon"></span>
			// 	</button>

			// 	<div class="collapse navbar-collapse" id="navbarNavDropdown">
			// 		<ul class="navbar-nav">
			// 			<li class="nav-item active" style={{decoration: "none"}}>
			// 				<Link className="nav-link" to="/">
			// 					<span className="sr-only">(current)</span>
			// 					Home
			// 				</Link>
			// 			</li>
			// 		</ul>

			// 		<ul>
			// 			<li className="nav-item dropdown">
			// 				<Dropdown isOpen={this.state.open} toggle={this.toggle}>
			// 					<DropdownToggle caret>Connexion</DropdownToggle>
			// 					<DropdownMenu>
			// 						<Link to="/CandidatLogin">
			// 							<DropdownItem>Candidature</DropdownItem>
			// 						</Link>

			// 						{/* <Link to="/registerEntreprise">
			//  								<DropdownItem>Entreprise</DropdownItem>
			// 							</Link> */}
			// 						<Link to="/registerAnnounce">
			// 							<DropdownItem>Announce</DropdownItem>
			// 						</Link>
			// 						<Link to="/EntrepriseLogin">
			// 							<DropdownItem>Entreprise</DropdownItem>
			// 						</Link>
			// 					</DropdownMenu>
			// 				</Dropdown>
			// 			</li>
			// 		</ul>
			// 	</div>
			//</nav>
		);
	}
}
