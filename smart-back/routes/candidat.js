var express = require("express");
var router = express.Router();
var Candidat = require("../model/candidat").Candidat;

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

module.exports = router;
