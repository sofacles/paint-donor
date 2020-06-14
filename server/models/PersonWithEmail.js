//Somebody will encrypt an email and send it to us as data
// When a user replies to the automatic PostPaint email, the URL will need to have the secret in it.

const PersonWithEmailSchemaAndModelFactory = function(mongoose) {
    const PersonWithEmailSchema = new mongoose.Schema({
        email: {type: String},
        secret: {type: String}
    });

    const PersonWithEmailModel = mongoose.model("PersonWithEmailSchema", PersonWithEmailSchema);

    return {
        PersonWithEmailSchema,
        PersonWithEmailModel
    }
};


module.exports = PersonWithEmailSchemaAndModelFactory;