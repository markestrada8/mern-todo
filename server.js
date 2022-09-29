const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')


//INSTANTIATE DATABASE
const connectionURI = "mongodb://127.0.0.1"
mongoose.connect(`${connectionURI}/todo`, { useNewUrlParser: true })

const database = mongoose.connection
database.on('error', (error) => console.log('database error: ', error))
database.once('connected', () => {
  console.log('database connected')
})

//ESTABLISH SCHEMA
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
})

const User = mongoose.model('User', userSchema)

//INSTANTIATE SERVER
const app = express()
//OLD VERSION
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use(cors())
app.use(express.json())
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username: username })
  if (user) {
    res.status(500)
    res.json({
      message: 'User already registered'
    })
    return
  } else {
    const user = new User({ username, password })
    user.save()
    res.json({
      message: 'success'
    })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username: username })
  if (!user || user.password !== password) {
    res.status(401)
    res.json({
      message: 'Invalid login'
    })
    return
  } else {
    const user = new User({ username, password })
    user.save()
    res.json({
      message: 'success'
    })
  }
})



app.listen(port, () => {
  console.log('server is listening on port: ', port)
})