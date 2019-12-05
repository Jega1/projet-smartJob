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
import SearchBar from "../../Components/SearchBar";
import Api from "../../Services/Api";

export default class CandidatLogin extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
	}
	state = {
		email: null,
		password: null
	};

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	candidatLogin = () => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValidEmail = re.test(this.state.email.toLowerCase());
		if (!isValidEmail) {
			alert("Email invalide");
			return;
		}

		this.api.candidatLogin(this.state.email, this.state.password).then(res => {
			console.log(res.data);
			if (res.data.success == true) {
				localStorage.setItem("candidat", JSON.stringify(res.data.candidat));
				localStorage.setItem("tokenCandidat", res.data.tokenCandidat);
			} else {
				alert(res.data.message);
			}
		});
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
				<SearchBar />
				<h2 style={{ textAlign: "center" }}>Sign In</h2>
				<Form className="form">
					<Col>
						<FormGroup>
							<Label>Email</Label>
							<Input
								type="email"
								name="email"
								placeholder="myemail@email.com"
								value={this.state.email}
								onChange={this.handleInputChange}
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
								onChange={this.handleInputChange}
								placeholder="********"
							/>
						</FormGroup>
					</Col>
					<Button sm={{ size: 8, offset: 4 }} onClick={this.candidatLogin}>
						Submit
					</Button>

					<Link className="" to="/inscription">
						Créer un compte
					</Link>
				</Form>
			</Container>
		);
	}
}
