var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var announceSchema = new Schema({
	dateCreation: {
		type: Date,
		default: new Date()
	},
	ville: String,
	entrepriseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Entreprise"
	},
	posteId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Poste"
	}
});

var Announce = mongoose.model("Announce", announceSchema);
exports.Announce = Announce;
