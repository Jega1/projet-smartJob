import axios from "axios";

export default class Api {
	constructor() {
		this.url = "http://localhost:3001";
	}

	registerCandidat(candidat) {
		// return axios.post(this.url + "/user/registerCandidat", candidat);
		return axios.post(this.url + "/candidat/registerCandidat", candidat);
	}

	registerEnterprise(enterprise) {
		return axios.post(this.url + "/enterprise/registerEnterprise", enterprise);
	}
	registerAnnounce(announce) {
		return axios.post(this.url + "/announce/registerAnnounce", announce);
	}

	///// Logins /////

	candidatLogin(email, password) {
		return axios.post(this.url + "/candidat/candidatLogin", {
			email: email,
			password: password
		});
	}
}
