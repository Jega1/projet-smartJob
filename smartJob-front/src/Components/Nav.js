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
			// <div>
			// 	<nav className="menu">
			// 		<h1 className="menu__logo">Smart job</h1>

			// 		<div className="menu__right">
			// 			<ul className="menu__list">
			// 				<li className="menu__list-item">
			// 					<Link className="menu__link menu__link--active" to="/">
			// 						Home
			// 					</Link>
			// 				</li>
			// 				<li className="menu__list-item">
			// 					<Link className="menu__link" to="/about">
			// 						About
			// 					</Link>
			// 				</li>

			// 				<li className="menu__list-item">
			// 					<Link className="menu__link" to="/about">
			// 						contact
			// 					</Link>
			// 				</li>

			// 				<li className="menu__list-item">
			// 					<Dropdown isOpen={this.state.open} toggle={this.toggle}>
			// 						<DropdownToggle caret>Connexion</DropdownToggle>
			// 						<DropdownMenu>
			// 							<Link to="/CandidatLogin">
			// 								<DropdownItem>Candidature</DropdownItem>
			// 							</Link>

			// 							{/* <Link to="/registerEntreprise">
			// 								<DropdownItem>Entreprise</DropdownItem>
			// 							</Link> */}
			// 							<Link to="/registerAnnounce">
			// 								<DropdownItem>Announce</DropdownItem>
			// 							</Link>
			// 							<Link to="/EntrepriseLogin">
			// 								<DropdownItem>Entreprise</DropdownItem>
			// 							</Link>
			// 						</DropdownMenu>
			// 					</Dropdown>
			// 				</li>
			// 			</ul>
			// 		</div>
			// 	</nav>
			// </div>

			<nav
				class="navbar navbar-expand-lg navbar-light "
				style={{backgroundColor: "rgb(72, 1, 475)", TextColor:"white" }}
			>
				<a class="navbar-brand" href="#">
					Navbar
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<li class="nav-item active">
							<Link className="nav-link" to="/">
								<span class="sr-only">(current)</span>
								Home
							</Link>
						</li>

						<li class="nav-item">
							<Link className="nav-link" to="/MainList">
								Produits
							</Link>
						</li>
						<li class="nav-item">
							<Link className="nav-link" to="/Edit">
								Modifier les produits
							</Link>
						</li>
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Dropdown link
							</a>
							<div
								class="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<a class="dropdown-item" href="#">
									Action
								</a>
								<a class="dropdown-item" href="#">
									Another action
								</a>
								<a class="dropdown-item" href="#">
									Something else here
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
