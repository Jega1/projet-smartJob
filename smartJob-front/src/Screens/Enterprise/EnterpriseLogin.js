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
	Button
} from "reactstrap";

export default class EnterpriseLogin extends Component {
	render() {
		return (
			<Container>
				<h2>Sign In entreprise</h2>
				<Form className="form">
					<Col>
						<FormGroup>
							<Label>Email</Label>
							<Input
								type="email"
								name="email"
								id="exampleEmail"
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
								id="examplePassword"
								placeholder="********"
							/>
						</FormGroup>
					</Col>
					<Button>Submit</Button>

					<Link className="" to="/registerEntreprise">
						Créer un compte enterprise
					</Link>
				</Form>
			</Container>
		);
	}
}
