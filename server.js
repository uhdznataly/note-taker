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
    res.sendFile(path.join(__dirname, '/index.html'))
);

//GET route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET route for JSON
app.get('/api/notes', (req, res) => res.json(notes));

//POST route for new note
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notes.length.toString();
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    res.json(notes);
});

//DELETE route for deleting notes
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    notes = notes.filter((note) => note.id !== noteId);
    fs.writeFileSync(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    res.json(notes);
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);