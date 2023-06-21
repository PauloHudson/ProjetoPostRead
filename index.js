const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar EJS
app.set('views', path.join(__dirname, 'View'));
app.set('view engine', 'ejs');

// Rota inicial
app.get('/', (req, res) => {
  res.render('post.ejs');
});
// Rota para criar um novo post

// Conectar ao MongoDB
const uri = 'mongodb+srv://Paulohudson:789paulo@cluster0.lsgbirw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.log('Erro ao conectar ao MongoDB:', error);
  });

// Definir esquema e modelo para Post
const PostSchema = new mongoose.Schema({
  title: String,
  text: String,
  content: String
});

const Post = mongoose.model('post', PostSchema);

app.post('/post', async (req, res) => {
  const { title, text, content } = req.body;
  console.log(title)
  const post = new Post({ title, text, content });
  try {
    await post.save();
    res.redirect('/');
  } catch (err) {
    console.log('Erro ao salvar post:', err);
    res.redirect('/');
  }
});

app.get('/blog', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render('write.ejs', { posts: posts });
  } catch (err) {
    console.log('Erro ao buscar posts:', err);
    res.redirect('/');
  }
});



// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
