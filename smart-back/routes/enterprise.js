var express = require("express");
var router = express.Router();
var Enterprise = require("../model/enterprise").Enterprise;
var Annonce = require("../model/annonce").Annonce;

const multer = require("multer");
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

// SET STORAGE
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "uploads");
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	}
});

var upload = multer({ storage: storage });

///////////////////////////////////

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

// router pour list
router.post("/enterpriseList", (req, res) => {
	enterprise.find((error, enterprise) => {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else {
			console.log(enterprise);
			res.status(200).send(enterprise);
		}
	});
});

router.post("/publierAnnonce", upload.single("file"), (req, res) => {
	let a = new Annonce();

	a.nom = req.body.annonce.nom;
	a.categorie = req.body.annonce.categorie;
	a.prix = req.body.annonce.prix;
	a.taille = req.body.annonce.taille;
	a.description = req.body.annonce.description;
	//a.file = req.file.path;
	console.log(req.body);
	a.enterprise = req.body.annonce.enterprise._id;
	console.log("fahhhfhfhfhfhfh");

	a.save(function(err, annonce) {
		console.log(annonce);
		if (err) {
			res.json({
				success: false,
				message: "une erreur est survenue"
			});
		} else {
			res.json({
				success: true,
				message: "Bravo, votre annonce a été publiée",
				annonce: annonce
			});
		}
	});
});

router.post("/getAnnonces", (req, res) => {
	// console.log("///////////////////////");
	// console.log(req.body.annonces);
	// console.log("///////////////////");
	Annonce.find({ enterprise: req.body.enterprise._id }, (err, annonces) => {
		if (err) {
			res.send(401);
		} else {
			res.json({
				success: true,
				mesAnnonces: annonces
			});
		}
	});
});

router.delete("/deleteAnnonce/:id", (req, res) => {
	Annonce.deleteOne({ _id: req.params.id }, err => {
		if (err) {
			res.send(400);
		} else {
			res.json({
				success: true,
				message: "L'annonce a été supprimée"
			});
		}
	});
});

module.exports = router;
