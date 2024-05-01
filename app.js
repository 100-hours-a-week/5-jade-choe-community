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
// 이 아래 코드는 아직 사용 X
app.get('/views/posts/:id', (req, res)=>{
  const postId = req.params.id;
  const jsonFilePath = path.join(__dirname, 'posts', 'post.json');
  let postList;
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      // 파일을 읽을 수 없는 경우 에러 응답
      res.status(500).send('Error reading JSON file');
      return;
    }
    postList = res.json(JSON.parse(data));
    });
  console.log(postList);
  res.sendFile(path.join(__dirname, 'views', `post.html`));
})
app.get('/views/edit posts/:id', (req, res)=>{
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