const fs = require('fs').promises;
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const dbFile = '.db/db.json';
const { readAndAppend, writeToFile, readFromFile } = require('../help/fsUtils');

// Get route that grabs all the notes
router.get('/notes', async (req, res) => {
    try {
        const data = await fs.readFile(dbFile, 'utf8');
        const notes = JSON.parse(data);

        const updatedNotes = notes.map((note) => ({
            ...note,
            id: uuidv4()
        }));

        await fs.writeFile(dbFile, JSON.stringify(updatedNotes, null, 4));
        res.json(updatedNotes);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error updating db.json');
    }
});

// Post route add a note
router.post('/notes', async (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        try {
            const data = await fs.readFile(dbFile, 'utf8');
            const notes = JSON.parse(data);
            notes.push(newNote);
            await fs.writeFile(dbFile, JSON.stringify(notes, null, 4));
            const response = {
                status: 'success',
                body: newNote
            };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json('Error updating db.json');
        }
    } else {
        res.json('Error in adding new note.');
    }
});

//Reads data from a file and appends new data to it.
router.post('/notes', async (req, res) => {
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      try {
        const data = await readFromFile(dbFile);
        const notes = JSON.parse(data);
        notes.push(newNote);
        await writeToFile(dbFile, notes);
        const response = {
          status: 'success',
          body: newNote,
        };
        res.json(response);
      } catch (error) {
        console.error(error);
        res.status(500).json('Error updating db.json');
      }
    } else {
      res.json('Error in adding new note.');
    }
});
  
// Delete route that'll be a param route
router.delete('/notes/:id', async (req, res) => {
    const Id = req.params.id;
    try {
        const data = await fs.readFile(dbFile, 'utf8');
        const notes = JSON.parse(data);
        const result = notes.filter((note) => note.id !== Id);
        await fs.writeFile(dbFile, JSON.stringify(result, null, 4));
        res.json(`Note with id:${Id} has been deleted 🗑️!`);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error updating db.json');
    }
});

module.exports = router;
