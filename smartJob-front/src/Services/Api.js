import axios from "axios";

export default class Api {
	constructor() {
		this.url = "http://localhost:3001";
	}

	registerClient(client) {
		return axios.post(this.url + "/client/registerClient", client);
	}

	registerEnterprise(enterprise) {
		return axios.post(this.url + "/enterprise/registerEnterprise", enterprise);
	}
	registerAnnounce(announce) {
		return axios.post(this.url + "/announce/registerAnnounce", announce);
	}

	///// Logins /////

	clientLogin(email, password) {
		return axios.post(this.url + "/client/clientLogin", {
			email: email,
			password: password
		});
	}

	enterpriseLogin(email, password) {
		return axios.post(this.url + "/enterprise/enterpriseLogin", {
			email: email,
			password: password
		});
	}
	publierAnnonce(annonce, urlImage) {
		return axios.post(this.url + "/enterprise/publierAnnonce", {
			annonce: annonce,
			urlImage: urlImage
		});
	}

	uploadFile(formData) {
		const config = {
			headers: {
				"content-type": "multipart/form-data"
			}
		};
		return axios.post(this.url + "/enterprise/uploadFile", formData, config);
	}

	getAnnonces(enterprise) {
		return axios.post(this.url + "/enterprise/getAnnonces", {
			enterprise: enterprise
		});
	}

	deleteAnnonce(id) {
		return axios.delete(this.url + "/enterprise/deleteAnnonce/" + id);
	}

	// pour le client
	getAllAnnonces() {
		return axios.get(this.url + "/client/getAllAnnonces");
	}

	commander(panier, user) {
		return axios.post(this.url + "/client/commander", {
			panier: panier,
			user: user
		});
	}
}
