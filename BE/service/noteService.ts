import { Express } from 'express';
import { INewNote, INote } from '../model/note.model';

// init notes array
let notes: INote[] = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

/**
 *  Generate Note Service
 * @param app
 */
const NoteService = (app: Express) => {
  // init get all notes
  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  // init get note by id
  app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find((note) => note.id === Number(id));
    note ? res.json(note) : res.status(404).end();
  });

  // init delete note by id
  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter((note) => note.id !== Number(id));
    res.status(204).end();
  });

  // init post note
  app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const body: INewNote = req.body;

    if (!body.content) {
      return res.status(400).json({
        error: 'content missing',
      });
    }

    const note = {
      id,
      content: body.content,
      important: body.important || false,
    };
    notes = notes.concat(note);
    res.json(note);
  });

  // init post note
  app.post('/api/notes', (req, res) => {
    const body: INewNote = req.body;

    if (!body.content) {
      return res.status(400).json({
        error: 'content missing',
      });
    }
    const maxId = generateId(notes);
    const note = {
      id: maxId,
      content: body.content,
      important: body.important || false,
    };
    notes = notes.concat(note);
    res.json(note);
  });

  // generate id for note
  const generateId = (notes: INote[]) => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
  };
};

// export Note Service
export default NoteService;
