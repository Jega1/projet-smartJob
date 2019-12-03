var express = require("express");
var router = express.Router();
var Announce = require("../model/announce").Announce;

// route pour créer l'utilisateur
router.post("/registerAnnounce", (req, res, next) => {
	let anno = new Announce(); // on instancie la classe User pour stocker dans MongoDB
	anno.poste = req.body.poste;
	anno.ville = req.body.ville;
	anno.discription = req.body.discription;

	anno.save((err, announce) => {
		if (!err && announce) {
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
