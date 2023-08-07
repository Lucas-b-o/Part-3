require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())

app.use(express.static('build'))

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :response-time ms :body'))

app.use(cors())

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  response.send(`<h1>Phonebook has info for ${persons.length} people</h1>` + new Date)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const Id = Math.random() * (10000000 - 1) + 1;
  return Id
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  // if (persons.filter(person => person.name === body.name).length > 0) {
  //   return response.status(400).json({ 
  //     error: 'name must be unique' 
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(result => {
      console.log(`added ${newName} number ${newNumber} to phonebook`)
      response.json(savedNote)
    })
    .catch(error => {
      console.log('Error',error)
    })

  response.json(person)
})

// app.put('/api/persons/:id', (request, response) => {
//   const body = request.body
//   const id = Number(request.params.id)

//   if (!body.name || !body.number) {
//     return response.status(400).json({ 
//       error: 'name or number missing' 
//     })
//   }

//   const index = persons.findIndex(person => person.id === id);

//   const personEdit = {
//     ...persons[index],
//     number: body.number,
//   }

//   persons[index] = personEdit

//   response.json(personEdit)
// })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`)
})