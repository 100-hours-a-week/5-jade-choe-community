const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(bodyParser.json())
const port = 3000

app.use('/comments', express.static(path.join(__dirname, "comments")))
app.use('/posts', express.static(path.join(__dirname, "posts")))
app.use('/users', express.static(path.join(__dirname, "users")))
app.use('/static', express.static(path.join(__dirname, "public")))
app.use('/views', express.static(path.join(__dirname, "views")))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'views','Log in.html'))
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})