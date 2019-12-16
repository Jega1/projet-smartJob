import React, { Component } from "react";

import { Link } from "react-router-dom";

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Container,
	Row,
	Col
} from "reactstrap";

import Api from "../../Services/Api";

export default class EnterpriseDashboard extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			enterprise: {},
			modalOpen: false,
			nom: null,
			categorie: "mariage",
			quantite: 1,
			prix: null,
			taille: "petite",
			description: "",
			mesAnnonces: [],
			editAnnounce: []
		};
	}
	componentDidMount() {
		let token = localStorage.getItem("tokenEnterprise");
		let enterp = localStorage.getItem("enterprise");

		if (!token || !enterp) {
			window.location = "/EnterpriseLogin";
			return;
		}

		this.setState({ enterprise: JSON.parse(enterp) }, () => {
			this.api.getAnnonces(this.state.enterprise).then(res => {
				console.log(res.data);
				if (res.data.success) {
					this.setState({ mesAnnonces: res.data.mesAnnonces });
				}
			});
		});
		console.log(this.state);
	}

	logout = () => {
		localStorage.clear();
		window.location = "/";
	};

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSelectQuantite = event => {
		this.setState({ quantite: event.target.value });
	};

	handleSelectTaille = event => {
		this.setState({ taille: event.target.value });
	};

	handleSelectCategorie = event => {
		this.setState({ categorie: event.target.value });
	};

	toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

	publierAnnonce = () => {
		console.log(this.state);
		this.api.publierAnnonce(this.state).then(res => {
			console.log(res.data);
		});
	};

	deleteAnnonce = id => {
		this.api.deleteAnnonce(id).then(res => {
			if (res.data.success) {
				alert(res.data.message);
				// on rafraichit les annonces
				this.api.getAnnonces(this.state.enterprise).then(res => {
					console.log(res.data);
					if (res.data.success) {
						this.setState({ mesAnnonces: res.data.mesAnnonces });
					}
				});
			} else {
				alert("Une erreur est survenue");
			}
		});
	};

	render() {
		let mesAnnonces = this.state.mesAnnonces.map((annonce, index) => {
			return (
				<Col md="4">
					<Card key={index}>
						<CardImg
							top
							width="100%"
							src="/assets/318x180.svg"
							alt="Card image cap"
						/>
						<CardBody>
							<CardTitle>{annonce.nom}</CardTitle>
							<CardSubtitle>{annonce.categorie}</CardSubtitle>
							<CardText>{annonce.prix}</CardText>

							<Button>Modifier</Button>
							<Button
								color="danger"
								onClick={() => this.deleteAnnonce(annonce._id)}
							>
								Supprimer
							</Button>
						</CardBody>
					</Card>
				</Col>
			);
		});
		return (
			<div>
				Bienvenue sur votre dashboard entreprise
				{this.state.enterprise ? this.state.enterprise.nom : null}
				<Button color="primary" onClick={this.toggleModal}>
					Ajouter
				</Button>
				<Container>
					<Row>{mesAnnonces}</Row>
				</Container>
				{/* start modal form to publier le announce*/}
				<Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label>Nom du produit</Label>
								<Input
									type="text"
									name="nom"
									placeholder="Le nom du produit"
									onChange={this.handleInputChange}
									value={this.state.produit}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Catégorie</Label>
								<Input
									type="select"
									name="categorie"
									onChange={this.handleSelectCategorie}
									value={this.state.categorie}
								>
									<option value="mariage">Gateau mariage</option>
									<option value="fete">Gateau fête</option>
									<option value="anniversaire">Gateau d'anniversaire</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Label>Quantité</Label>
								<Input
									type="select"
									name="quantite"
									onChange={this.handleSelectQuantite}
									value={this.state.quantite}
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Label>Prix unitaire</Label>
								<Input
									type="number"
									name="prix"
									placeholder="Prix du produit"
									value={this.state.prix}
									onChange={this.handleInputChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Taille</Label>
								<Input type="select" name="taille">
									<option>Petite</option>
									<option>Moyenne</option>
									<option>Grande</option>
								</Input>
							</FormGroup>

							<FormGroup>
								<Label>Description du gâteau</Label>
								<Input
									type="textarea"
									name="description"
									onChange={this.handleInputChange}
									value={this.state.description}
								/>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.publierAnnonce}>
							Publier l'annonce
						</Button>{" "}
						<Button color="secondary" onClick={this.toggleModal}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
