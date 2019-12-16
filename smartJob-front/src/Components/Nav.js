import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Button,
	ListGroup,
	ListGroupItem,
	Badge
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
//import { Col, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import Api from "../Services/Api";

export default class Nav extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
	}
	state = {
		open: false,
		openDetails: false,
		openPanier: false,
		user: this.props.user,
		panier: this.props.panier
	};

	toggle = () => {
		this.setState({ open: !this.state.open });
	};

	toggleDetails = () => {
		this.setState({ openDetails: !this.state.openDetails });
	};

	togglePanier = () => {
		this.setState({
			openPanier: !this.state.openPanier
		});
	};

	commander = () => {
		this.api.commander(this.state.panier, this.state.user).then(res => {
			if (res.data.success) {
				localStorage.removeItem("panier");
				alert(res.data.message);
			}
		});
	};

	logout = () => {
		localStorage.clear();
		window.location = "/";
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
								<Link className="menu__link" to="/about">
									contact
								</Link>
							</li>

							<li className="menu__list-item">
								{this.state.user ? (
									<Dropdown
										isOpen={this.state.openDetails}
										toggle={this.toggleDetails}
									>
										<DropdownToggle caret>
											{this.state.user.email}
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem>Mon compte</DropdownItem>
											<DropdownItem onClick={this.logout}>
												Se déconnecter
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								) : (
									<Dropdown isOpen={this.state.open} toggle={this.togglePanier}>
										<DropdownToggle caret>Connexion</DropdownToggle>
										<DropdownMenu>
											<Link to="/ClientLogin">
												<DropdownItem>Client</DropdownItem>
											</Link>

											<Link to="/EntrepriseLogin">
												<DropdownItem>Entreprise</DropdownItem>
											</Link>
										</DropdownMenu>
									</Dropdown>
								)}
							</li>
							{this.state.user && this.state.panier ? (
								<span>
									<Button color="success" outline onClick={this.togglePanier}>
										Panier{" "}
										<Badge color="secondary">{this.state.panier.length}</Badge>
									</Button>
									<Modal
										isOpen={this.state.openPanier}
										toggle={this.togglePanier}
									>
										<ModalHeader toggle={this.togglePanier}>
											Mon panier
										</ModalHeader>
										<ModalBody>
											<ListGroup>
												{this.state.panier.map((article, index) => {
													return (
														<ListGroupItem className="justify-content-between">
															{article.nom} <Badge pill>{article.prix} $</Badge>
														</ListGroupItem>
													);
												})}
											</ListGroup>
										</ModalBody>
										<ModalFooter>
											<h1>
												Total:
												{this.state.panier.reduce(
													(acc, current) => acc + current.prix,
													0
												)}{" "}
												$
											</h1>
											<Button color="primary" onClick={this.commander}>
												Commander
											</Button>{" "}
											<Button color="secondary" onClick={this.togglePanier}>
												Annuler
											</Button>
										</ModalFooter>
									</Modal>
								</span>
							) : null}
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}
