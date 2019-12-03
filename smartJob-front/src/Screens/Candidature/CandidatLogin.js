import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Container,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from "reactstrap";
import SearchBar  from '../../Components/SearchBar';


export default class CandidatLogin extends Component {
	render() {
		return (
			<Container>
				<SearchBar/>
				<h2>Sign In</h2>
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

					<Link className="" to="/inscription">
						Créer un compte
					</Link>
				</Form>
			</Container>
		);
	}
}
