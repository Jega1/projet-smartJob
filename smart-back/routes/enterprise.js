var express = require("express");
var router = express.Router();
var Enterprise = require("../model/enterprise").Enterprise;
var Annonce = require("../model/annonce").Annonce;
const secret = "3ywb*XEGEC7)";
const jwt = require("jwt-simple");
const { uuid } = require("uuidv4");
const DIR = "./";
const multer = require("multer");
var cloudinary = require("cloudinary").v2;
/// permet d'authentifier avec cloudinary
cloudinary.config({
	cloud_name: "drqoryqj0",
	api_key: "616359531224173",
	api_secret: "Qce5c_9Ft2z0Rp6Zqvdt03Lhr6s"
});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname
			.toLowerCase()
			.split(" ")
			.join("-");
		cb(null, uuid() + "-" + fileName);
	}
});

var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
		}
	}
});

// router pour uploader une image
router.post("/uploadFile", upload.single("myImage"), (req, res) => {
	//var img = fs.readFileSync(req.file.path);
	console.log("TTTEEEESSSSTTTT");
	console.log(req.file);
	cloudinary.uploader.upload(req.file.path, function(error, result) {
		console.log(error);
		if (error) {
			res.json({
				success: false,
				message: errir
			});
		} else {
			res.json({
				success: true,
				url: result.secure_url
			});
		}
		console.log(result);
	});
});

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

router.post("/publierAnnonce", (req, res) => {
	let a = new Annonce();
	a.nom = req.body.annonce.nom;
	a.categorie = req.body.annonce.categorie;
	a.prix = req.body.annonce.prix;
	a.taille = req.body.annonce.taille;
	a.description = req.body.annonce.description;
	a.enterprise = req.body.annonce.enterprise._id;
	if (req.body.urlImage) {
		a.photo = req.body.urlImage;
	}
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
