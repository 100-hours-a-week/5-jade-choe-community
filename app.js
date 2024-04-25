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
  res.sendFile(path.join(__dirname,'views','Log in.html'));
})
app.get('/views/post/:id', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'post', `${req.params.id}`));
})
app.get('/views/edit post/:id', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'edit post', `${req.params.id}`));
})
app.get('/views/edit profile/:id', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'edit profile', `${req.params.id}`));
})
app.get('/views/edit password/:id', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'edit password', `${req.params.id}`));
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})