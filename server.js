// Import required packages
import express from 'express'
import connection from '../lib/db/connection.js';
import Bookmark from '../models/Bookmark.js';
import * as dotenv from 'dotenv'


dotenv.config()

// Import environment variables
const PORT = process.env.PORT || 4000

// Set up Express app
const app = express();
app.use(bodyParser.json());

// Create a Bookmark model
const Bookmark = mongoose.model('Bookmark', {
  title: String,
  url: String
});

// Routes
// Get all bookmarks
app.get('/bookmarks', (req, res) => {
  Bookmark.find()
    .then(bookmarks => res.json(bookmarks))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get a single bookmark
app.get('/bookmarks/:id', (req, res) => {
  Bookmark.findById(req.params.id)
    .then(bookmark => {
      if (!bookmark) {
        return res.status(404).json({ error: 'Bookmark not found' });
      }
      res.json(bookmark);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Create a new bookmark
app.post('/bookmarks', (req, res) => {
  const bookmark = new Bookmark({
    title: req.body.title,
    url: req.body.url
  });

  bookmark.save()
    .then(savedBookmark => res.status(201).json(savedBookmark))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a bookmark
app.put('/bookmarks/:id', (req, res) => {
  Bookmark.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    url: req.body.url
  }, { new: true })
    .then(updatedBookmark => {
      if (!updatedBookmark) {
        return res.status(404).json({ error: 'Bookmark not found' });
      }
      res.json(updatedBookmark);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a bookmark
app.delete('/bookmarks/:id', (req, res) => {
  Bookmark.findByIdAndRemove(req.params.id)
    .then(deletedBookmark => {
      if (!deletedBookmark) {
        return res.status(404).json({ error: 'Bookmark not found' });
      }
      res.sendStatus(204);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
