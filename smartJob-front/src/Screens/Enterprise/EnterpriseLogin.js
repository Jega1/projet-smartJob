import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {
	Container,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Alert
} from "reactstrap";

export default class EnterpriseLogin extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		email: null,
		password: null
	};

	enterpriseLogin = () => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValidEmail = re.test(this.state.email.toLowerCase());
		if (!isValidEmail) {
			Alert.alert("Email invalide");
			return;
		}
	};
	render() {
		return (
			<Container
				style={{
					backgroundColor: "whitesmoke",
					width: "80%",
					margin: "auto",
					padding: " 4rem"
				}}
			>
				<h2 style={{ textAlign: "center" }}>Sign In entreprise</h2>
				<Form style={{ backgroundColor: "" }}>
					<Col>
						<FormGroup>
							<Label>Email</Label>
							<Input
								type="email"
								name="email"
								value={this.state.email}
								placeholder="myemail@email.com"
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="examplePassword">Password</Label>
							<Input
								type="password"
								name="password"
								value={this.state.password}
								placeholder="********"
							/>
						</FormGroup>
					</Col>
					<Button onClick={this.enterpriseLogin} disabled={this.state.loading}>
						Submit
					</Button>

					<Link className="" to="/registerEntreprise">
						Créer un compte enterprise
					</Link>
				</Form>
			</Container>
		);
	}
}
