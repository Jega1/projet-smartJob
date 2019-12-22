import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardLink,
	CardTitle,
	CardSubtitle,
	Container,
	Row,
	Col,
	Button
} from "reactstrap";
import Api from "../../Services/Api";
import AnnonceDetaille from "./AnnonceDetaille";

export default class ClientDashboard extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			client: {},
			annonces: []
		};
	}
	componentDidMount() {
		let token = localStorage.getItem("tokenClient");
		let c = localStorage.getItem("client");

		if (!token || !c) {
			window.location = "/clientLogin";
			return;
		}

		this.setState({ client: JSON.parse(c) });
		this.api.getAllAnnonces().then(res => {
			console.log(res.data);
			this.setState({
				annonces: res.data.allAnnonces
			});
		});
	}

	// monCompte = () => {
	// 	window.location = "/ClientDashboard";
	// };

	logout = () => {
		localStorage.clear();
		window.location = "/";
	};

	// panier
	ajouterAuPanier = annonce => {
		let panier = JSON.parse(localStorage.getItem("panier"));
		if (panier) {
			// si le panier existe, on le prend et on y ajoute le nouvel article
			panier.push(annonce);
			localStorage.setItem("panier", JSON.stringify(panier));
			window.location.reload();
		} else {
			// si le panier n'existe pas encore, on le créé
			let p = [];
			p.push(annonce);
			localStorage.setItem("panier", JSON.stringify(p));
		}
	};

	render() {
		let annonces = this.state.annonces.map((annonce, index) => {
			return (
				<Col md="4">
					<Card key={index}>
						<CardImg
							top
							width="100%"
							src={annonce.photo}
							alt="Card image cap"
						/>
						<CardBody>
							<CardTitle>{annonce.nom}</CardTitle>
							<CardSubtitle>{annonce.prix}$</CardSubtitle>
						</CardBody>
						<CardBody>
							<CardText>{annonce.description}</CardText>
							<Button
								color="primary"
								onClick={() => this.ajouterAuPanier(annonce)}
							>
								Ajouter au panier
							</Button>
							<Button color="success" onClick={this.AnnonceDetaille}>
								Voir le produits
							</Button>
						</CardBody>
					</Card>
				</Col>
			);
		});

		return (
			<div>
				<Container>
					{/* <AnnonceDetaille /> */}
					<Row>{annonces}</Row>
				</Container>
			</div>
		);
	}
}
