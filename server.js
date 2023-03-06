//set all our dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



//GET route for homepage
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Read db.json file and return saved notes as JSON
app.get('/api/notes', (req, res) => {
readFile('db/db.json')
  .then(data => {
    res.send(data)
  })
});

// Create and save new note
app.post('/api/notes', (req, res) => {
const newNote = req.body;
newNote.id = uuidv4();
readFile('db/db.json')
  .then(data => {
    const allNotes = JSON.parse(data);
    allNotes.push(newNote);
    writeFile('db/db.json', JSON.stringify(allNotes)).then(data => {
      res.json(newNote);
    })
  })
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
readFile('db/db.json')
.then(data => {
  let allNotes = JSON.parse(data);
  const { id } = req.params;
  allNotes = allNotes.filter(note => note.id !== id);
  writeFile('db/db.json', JSON.stringify(allNotes))
  .then(data => {
    res.json(allNotes);
  })
})
});
  
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);