const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./mongo");
app.use(express.json());
app.use(cors());
app.use(express.static('dist'))


morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : " "
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: "no info" });
  }
});
app.get("/api/persons/:id", async (req, res) => {
  try {
    const findPerson = await Person.findById(req.params.id);
    res.status(200).json(findPerson);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.get("/api/info", async (req, res) => {
  try {
    const numberpeople = await Person.length;
    const currentTime = Date().toString();
    res.send(`<p>Phonebook has info for ${numberpeople} people</p>
      <p>${currentTime}</p>`);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.delete("/api/persons/:id", async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post("/api/persons", async (req, res) => {
  try {
    const newperson = new Person(req.body);
    await newperson.save();
    res.status(200).json(newperson);
  } catch (err) {
    res.status(500).json(err);
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
