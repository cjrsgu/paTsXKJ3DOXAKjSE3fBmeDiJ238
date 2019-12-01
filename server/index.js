const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const contacts = [
  {
    'id': 411,
    'first_name': 'John',
    'last_name': 'Pupkin',
    'birth_date': '2019-11-05',
    'gender': 'male',
    'job': 'Terminator ciller',
    'biography': 'ascasd',
    'is_active': true,
  },
  {
    'id': 412,
    'first_name': 'Vasia',
    'last_name': 'Pupkin',
    'birth_date': '2019-10-30',
    'gender': 'male',
    'job': 'ads',
    'biography': 'ads',
    'is_active': true,
  },
  {
    'id': 416,
    'first_name': 'zzz',
    'last_name': 'EEE',
    'birth_date': '2019-11-29',
    'gender': 'male',
    'job': 'DDD',
    'biography': 'BBB',
    'is_active': true,
  },
  {
    'id': 417,
    'first_name': 'das',
    'last_name': 'asd',
    'birth_date': '2019-10-30',
    'gender': 'male',
    'job': 'ads',
    'biography': 'das',
    'is_active': true,
  },
  {
    'id': 418,
    'first_name': 'John',
    'last_name': 'Pupkin',
    'birth_date': '2019-10-29',
    'gender': 'male',
    'job': 'as',
    'biography': 'das',
    'is_active': true,
  },
  {
    'id': 419,
    'first_name': 'das',
    'last_name': 'sad',
    'birth_date': '2019-10-31',
    'gender': 'male',
    'job': 'ad',
    'biography': 'asd',
    'is_active': true,
  },
];

const router = express.Router();

router.route('/contact/')
  .get((request, response) => {
    console.log('contact', 'get');
    response.json(contacts);
  })
  .post((request, response) => {
    console.log('contact', 'post');
    let maxId = 0;

    contacts.forEach((contact) => {
      if (contact.id > maxId) {
        maxId = contact.id;
      }
    });
    const newContact = { ...request.body, id: maxId + 1 };

    contacts.push(newContact);

    response.json(newContact);
  });

router.route('/contact/:id')
  .get((request, response) => {
    console.log('contact/:id', 'get');
    const contact = contacts.find((contact) => contact.id == request.params.id);

    response.json(contact);
  })
  .delete((request, response) => {
    console.log('contact/:id', 'delete');
    const contactIndex = contacts.findIndex((contact) => contact.id == request.params.id);

    response.json(contacts[contactIndex]);

    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);
    }
  })
  .put((request, response) => {
    console.log('contact/:id', 'put');

    const contactIndex = contacts.findIndex((contact) => contact.id == request.params.id);

    if (contactIndex !== -1) {
      contacts[contactIndex] = { ...request.body, id: contacts[contactIndex].id};
    }
    console.log(contacts[contactIndex]);
    response.json(contacts[contactIndex]);
  });

app.use('/v1', router);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
