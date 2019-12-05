var express = require("express");
var router = express.Router();
var Candidat = require("../model/candidat").Candidat;
const secret = "3ywb*XEGEC7)";
const jwt = require("jwt-simple");

// fonction pour vérifier l'utilisateur pour le login
function checkUser(email, password) {
	return new Promise((resolve, reject) => {
		email = email.toLowerCase(); // tout le mail on convertit en minuscule
		// on cherche un candidat avec le mail donné
		// findOne c'est ppiur chercher UN UNIQUE candidat avec ce mail dans la bdd
		Candidat.findOne({ email: email }, (err, candidat) => {
			if (err) {
				return reject(err, null);
			}
			if (
				!candidat ||
				candidat === false ||
				!candidat.validatePassword(password)
			) {
				return reject(
					{
						type: "wrongCredentials",
						message: "Email ou mot de passe erronné"
					},
					null
				);
			}
			candidat.password = null; // pour la sécuirté
			candidat.salt = null; // pour la sécurité
			return resolve({ candidat: candidat });
		});
	});
}

// route pour créer l'utilisateur
router.post("/registerCandidat", (req, res, next) => {
	let candi = new Candidat(); // on instancie la classe User pour stocker dans MongoDB
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
router.post("/candidatLogin", (req, res) => {
	if (req.body.email && req.body.password) {
		checkUser(req.body.email, req.body.password)
			.then(r => {
				// on génère on token pour le stocker dans le front pour garder la session
				// génération du token si le user ok.
				let token = jwt.encode(r.candidat._id, secret);

				res.json({
					success: true,
					candidat: r.candidat,
					tokenCandidat: token
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
