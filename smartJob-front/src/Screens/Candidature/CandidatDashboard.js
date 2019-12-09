import React, { Component } from "react";
import FirstBlock from "../../Components/FirstBlock";
import Carousel from "../../Components/Carousel";


export default class CandidatDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			candidat: {}
		};
	}
	componentDidMount() {
		let token = localStorage.getItem("tokenCandidat");
		let c = localStorage.getItem("candidat");

		if (!token || !c) {
			window.location = "/candidatLogin";
			return;
		}

		this.setState({ candidat: JSON.parse(c) });
		console.log(this.state);
	}

	logout = () => {
		localStorage.clear();
		window.location = "/";
	};
	render() {
		return (
			<div>
				<Carousel />
				
				<FirstBlock />
				Welcome to candidat dashboard{" "}
				{this.state.candidat ? this.state.candidat.nom : null}
				<button onClick={this.logout}>Logout</button>
			</div>
		);
	}
}
