const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const dbName = 'noteApp'

const url =
    `mongodb+srv://fullstack:${password}@fullstackopen-test.pzwqw2x.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

//Recupera dados do DB
Note.find({important: false}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

//Cria Dados no DB

// const note = new Note({
//   content: 'HTML is Easy5',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })