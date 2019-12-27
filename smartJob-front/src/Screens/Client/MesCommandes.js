import React, { Component } from "react";

import Api from "../../Services/Api";

import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Container,
	Row,
	Col,
	Button
} from "reactstrap";

export default class MesCommandes extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			commandes: []
		};
	}

	componentDidMount() {
		let token = localStorage.getItem("tokenClient");
		let c = localStorage.getItem("client");

		if (token && c) {
			// si le token est présent dans le localstorage, il faut en plus vérifier si ce token est valide
			// on l'envoie à nodejs, nodejs le déchiffre avec le secret key et vérifie si ce token correspond à un user id
			this.api.checkToken(token).then(res => {
				if (res.data.success) {
					this.setState({ client: res.data.client });
					this.api.getMesCommandes(this.state.client).then(res => {
						if (res.data.success) {
							this.setState({ commandes: res.data.commandes });
							console.log(this.state);
						} else {
							alert(res.data.message);
						}
					});
				} else {
					localStorage.clear();
					window.location = "/clientLogin";
				}
			});
		} else {
			localStorage.clear();
			window.location = "/clientLogin";
		}
	}

	render() {
		let commandes = this.state.commandes.map((commande, index) => {
			return (
				<div key={index}>
					<hr />
					{commande.panier.map((p, i) => {
						return <div key={i}>{p.nom}</div>;
					})}
				</div>
			);
		});
		return <div>{commandes}</div>;
	}
}
