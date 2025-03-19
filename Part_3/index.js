const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
dotenv.config();
app.use(express.json());
app.use(cors());
morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : " "
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};
connectDB();
let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id == id);
  if (!person) {
    res.status(404).json({ error: "Person not found" });
  }
  res.json(person);
});
app.get("/api/info", (req, res) => {
  const numberpeople = persons.length;
  const currentTime = Date().toString();
  res.send(`<p>Phonebook has info for ${numberpeople} people</p>
    <p>${currentTime}</p>`);
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id != id);
  res.status(204).end();
});
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  const existName = persons.find((person) => person.name == name);
  if (!name || !number) {
    res.status(400).json({ error: "Name and number are required" });
  } else if (existName) {
    res.status(400).json({ error: "Name must be unique" });
  } else {
    const id = Math.floor(Math.random() * 10000000);
    let person = { id, name, number };
    persons.push(person);
    res.status(200).json({ message: `${name} is added` });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
