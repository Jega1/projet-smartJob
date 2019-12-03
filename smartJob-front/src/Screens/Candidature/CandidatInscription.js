import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import Api from "../../Services/Api";

export default class CandidatInscription extends Component {
	constructor(props) {
		super(props);
		this.state = { apiResponse: "" };

		this.state = {
			nom: null,
			prenom: null,
			poste: null,
			email: null,
			password: null,
			ville: null,
			date: new Date(),
			loading: false,
			message: null
		};

		this.api = new Api();
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	registerCandidat = event => {
		event.preventDefault();
		this.setState({ loading: true });

		this.api.registerCandidat(this.state).then(res => {
			console.log(res.data);
			this.setState({ loading: false, message: res.data.message });
		});
	};

	render() {
		return (
			<div>
				<h3>Trouvez tous les jobs qu'il vous faut en créant un compte !</h3>

				<Form>
					<FormGroup row>
						<Label sm={2}>Email</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="email"
								value={this.state.email}
								name="email"
								placeholder="Email"
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2}>Nom</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="text"
								value={this.state.nom}
								name="nom"
								placeholder="Nom"
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2}>Prenom</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="text"
								value={this.state.prenom}
								name="prenom"
								placeholder="Prenom"
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>Poste</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="text"
								value={this.state.poste}
								name="poste"
								placeholder="Poste"
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2}>Ville</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="text"
								value={this.state.ville}
								name="ville"
								placeholder="Ville"
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2}>Mot de passe</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="password"
								value={this.state.password}
								name="password"
								placeholder="Mot de passe"
							/>
						</Col>
					</FormGroup>

					<FormGroup check row>
						<Col sm={{ size: 8, offset: 4 }}>
							<Button
								type="submit"
								onClick={this.registerCandidat}
								disabled={this.state.loading}
							>
								Submit
							</Button>
						</Col>
					</FormGroup>
					{this.state.message ? (
						<Alert color="success">{this.state.message}</Alert>
					) : null}
				</Form>
			</div>
		);
	}
}
