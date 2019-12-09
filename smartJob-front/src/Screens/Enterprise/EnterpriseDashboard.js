import React, { Component } from "react";
import TabsBlock from "../../Components/TabsBlock";
import Nav from "../../Components/Nav";
import NavBar from "../../Components/NavBar";

export default class EnterpriseDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			enterprise: {}
		};
	}
	componentDidMount() {
		let token = localStorage.getItem("tokenEnterprise");
		let enterp = localStorage.getItem("enterprise");

		if (!token || !enterp) {
			window.location = "/EnterpriseLogin";
			return;
		}

		this.setState({ enterprise: JSON.parse(enterp) });
		console.log(this.state);
	}

	logout = () => {
		localStorage.clear();
		window.location = "/";
	};

	render() {
		return (
			<div>
			
				<Nav />
				Welcome to candidat dashboard{" "}
				{this.state.enterprise ? this.state.enterprise.nom : null}
				<button onClick={this.logout}>Logout</button>
				<TabsBlock />
			</div>
		);
	}
}
