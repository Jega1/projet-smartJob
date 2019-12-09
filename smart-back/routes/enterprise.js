var express = require("express");
var router = express.Router();
var Enterprise = require("../model/enterprise").Enterprise;
const secret = "3ywb*XEGEC7)";
const jwt = require("jwt-simple");

// fonction pour vérifier l'utilisateur pour le login(2)
function checkUser(email, password) {
	return new Promise((resolve, reject) => {
		email = email.toLowerCase(); // tout le mail on convertit en minuscule
		// on cherche un candidat avec le mail donné
		// findOne c'est ppiur chercher UN UNIQUE candidat avec ce mail dans la bdd
		Enterprise.findOne({ email: email }, (err, enterprise) => {
			if (err) {
				return reject(err, null);
			}
			if (
				!enterprise ||
				enterprise === false ||
				!enterprise.validatePassword(password)
			) {
				return reject(
					{
						type: "wrongCredentials",
						message: "Email ou mot de passe erronné"
					},
					null
				);
			}
			enterprise.password = null; // pour la sécuirté
			enterprise.salt = null; // pour la sécurité
			return resolve({ enterprise: enterprise });
		});
	});
}

// route pour créer l'utilisateur (1)
router.post("/registerEnterprise", (req, res, next) => {
	let enterp = new Enterprise(); // on instancie la classe User pour stocker dans MongoDB
	enterp.nom = req.body.nom;
	enterp.prenom = req.body.prenom;
	enterp.poste = req.body.poste;
	enterp.email = req.body.email;
	enterp.ville = req.body.ville;
	enterp.password = req.body.password;

	enterp.save((err, enterprise) => {
		if (!err && enterprise) {
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
router.post("/enterpriseLogin", (req, res) => {
	if (req.body.email && req.body.password) {
		checkUser(req.body.email, req.body.password)
			.then(r => {
				// on génère on token pour le stocker dans le front pour garder la session
				// génération du token si le user ok.
				let token = jwt.encode(r.enterprise._id, secret);

				res.json({
					success: true,
					enterprise: r.enterprise,
					tokenEnterprise: token
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

module.exports = router;
