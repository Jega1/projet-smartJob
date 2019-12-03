var express = require("express");
var router = express.Router();
var Enterprise = require("../model/enterprise").Enterprise;

// route pour créer l'utilisateur
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

module.exports = router;
