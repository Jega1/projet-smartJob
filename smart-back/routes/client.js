var express = require("express");
var router = express.Router();
var Client = require("../model/client").Client;
var Annonce = require("../model/annonce").Annonce;
var Commande = require("../model/commande").Commande;
const secret = "3ywb*XEGEC7)";
const jwt = require("jwt-simple");

// fonction pour vérifier l'utilisateur pour le login
function checkUser(email, password) {
	return new Promise((resolve, reject) => {
		email = email.toLowerCase(); // tout le mail on convertit en minuscule
		// on cherche un cleint avec le mail donné
		// findOne c'est ppiur chercher UN UNIQUE client avec ce mail dans la bdd
		Client.findOne({ email: email }, (err, client) => {
			if (err) {
				return reject(err, null);
			}
			if (!client || client === false || !client.validatePassword(password)) {
				return reject(
					{
						type: "wrongCredentials",
						message: "Email ou mot de passe erronné"
					},
					null
				);
			}
			client.password = null; // pour la sécuirté
			client.salt = null; // pour la sécurité
			return resolve({ client: client });
		});
	});
}

// route pour créer l'utilisateur
router.post("/registerClient", (req, res, next) => {
	let candi = new Client(); // on instancie la classe User pour stocker dans MongoDB
	candi.nom = req.body.nom;
	candi.prenom = req.body.prenom;
	candi.poste = req.body.poste;
	candi.email = req.body.email;
	candi.ville = req.body.ville;
	candi.password = req.body.password;

	candi.save((err, user) => {
		if (!err && user) {
			res.json({
				success: true, // on renvoie un objet json au front pour dire que tout s'est bien passé
				message: "Bravo vous avez réussi à créer un compte."
			});
		} else {
			console.log(err);
			res.json({
				success: false, // on renvoie un objet json au front pour dire que il y a un pb
				message: "Impossible de crééer un compte avec les infos fournies."
			});
		}
	});
});

// router pour login
router.post("/clientLogin", (req, res) => {
	if (req.body.email && req.body.password) {
		checkUser(req.body.email, req.body.password)
			.then(r => {
				// on génère on token pour le stocker dans le front pour garder la session
				// génération du token si le user ok.
				let token = jwt.encode(r.client._id, secret);

				res.json({
					success: true,
					client: r.client,
					tokenClient: token
				});
			})
			.catch(error => {
				res.json({
					success: false,
					error: error
				});
			});
	} else {
		res.json({
			success: false,
			message: "Rensegnez le mail et le mot de passe"
		});
	}
});

// lister all announce coté de client
router.get("/getAllAnnonces", (req, res) => {
	Annonce.find((error, annonces) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.json({
				success: true,
				allAnnonces: annonces
			});
		}
	});
});

// router pour commander
router.post("/commander", (req, res) => {
	let c = new Commande();
	c.acheteur = req.body.user._id;
	c.panier = req.body.panier;
	c.total = req.body.panier.reduce((acc, current) => acc + current.prix, 0);
	c.save((err, commande) => {
		res.json({ success: true, commande: commande });
	});
});

module.exports = router;
