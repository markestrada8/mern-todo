const express = require('express')

//instantiate server
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('server is listening on port: ', port)
})