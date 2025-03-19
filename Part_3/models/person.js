const { default: mongoose } = require("mongoose");
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
