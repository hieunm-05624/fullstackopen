import { Express } from 'express';
import { INewPhoneBook, IPhoneBook } from '../model/phoneBook.model';

// init phone book array
let phoneBooks: IPhoneBook[] = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

/**
 *  Generate phone book service
 * @param app
 */

const PhoneBookService = (app: Express) => {
  // init get info
  app.get('/info', (req, res) => {
    const stringInfo = `Phonebook has info for ${phoneBooks.length} people`;
    const date = new Date();
    res.send(`<p>${stringInfo}</p><p>${date}</p>`);
  });

  // init get all phone book
  app.get('/api/persons', (req, res) => {
    res.json(phoneBooks);
  });

  // init get phone book by id
  app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const phoneBook = phoneBooks.find((item) => item.id === Number(id));
    phoneBook ? res.json(phoneBook) : res.status(404).end();
  });

  // init delete phone book by id
  app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    phoneBooks = phoneBooks.filter((item) => item.id !== Number(id));
    res.status(204).end();
  });

  // init post phone book
  app.post('/api/persons', (req, res) => {
    const body: INewPhoneBook = req.body;

    if (!body.name) {
      return res.status(400).json({
        error: 'name is missing',
      });
    }

    if (!body.number) {
      return res.status(400).json({
        error: 'number is missing',
      });
    }

    if (checkExistName(body.name)) {
      return res.status(400).json({
        error: 'name must be unique',
      });
    }

    const maxId = generateId(phoneBooks);
    const phoneBook = {
      id: maxId,
      ...body,
    };
    phoneBooks = phoneBooks.concat(phoneBook);
    res.json(phoneBook);
  });

  // init generate id
  const generateId = (phoneBooks: IPhoneBook[]) => {
    const maxId = phoneBooks.length > 0 ? Math.max(...phoneBooks.map((n) => n.id)) : 0;
    return maxId + 1;
  };

  // init check exist name
  const checkExistName = (name: string) => {
    const existName = phoneBooks.find((item) => item.name.toLowerCase() === name.toLowerCase());
    return Boolean(existName);
  };
};

// export phone book service
export default PhoneBookService;
