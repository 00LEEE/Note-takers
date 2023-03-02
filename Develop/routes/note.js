const fs = require('fs').promises;
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const dbFile = '../Develop/db/db.json';

// Get route on /api/notes that gets all the notes
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
