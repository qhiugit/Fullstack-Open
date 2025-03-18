const express = require("express");
const app = express();
app.use(express.json());
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
  const person = req.body;
  persons.push(person);
  res.json(persons);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
