const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]
const dbName = 'PhoneBookApp'

const url =
    `mongodb+srv://fullstack:${password}@fullstackopen-test.pzwqw2x.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const numberSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', numberSchema)

//Cria Dados no DB
if (newName && newNumber) {
    const person = new Person({
        name: newName,
        number: newNumber,
    })

    person.save().then(result => {
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
    })
} else {
    //Recupera dados do DB
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        console.log('end')
        mongoose.connection.close()
    })
}


