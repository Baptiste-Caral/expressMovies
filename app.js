const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()

const PORT = 3001
let frenchMovies = []

// Middleware pour les chemins public (css)
app.use('/public', express.static('public'))


app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/movies', (req, res) => {
  frenchMovies = [
    {title: 'James Bond', year: 2020},
    {title: 'Flash', year: 2021},
    {title: 'Avengers infinity war', year: 2019}
  ]
  res.render('movies', {frenchMovies: frenchMovies})
  
})

// récupere le contenue du body d'une requete Post
let urlencodeParser = bodyParser.urlencoded({ extended: false })

// app.post('/movies', urlencodeParser, (req,res) => {
  
  
//   console.log(req.body)
//   const newMovie = { title: req.body.movietitle, year: req.body.movieyear }
//   // ajoute le newMovie dans le tableau frenchMovies équivaut à: frenchMovies.push(newMovie)
//   frenchMovies = [...frenchMovies, newMovie]
//   console.log(frenchMovies);
//   res.sendStatus(201)
// })

app.post('/movies', upload.fields([]), (req, res) => {
  if(!req.body) {
    return res.sendStatus(500)
  } else {
    const formData = req.body
    console.log(formData);
    const newMovie = { title: req.body.movietitle, year: req.body.movieyear }
    // ajoute le newMovie dans le tableau frenchMovies équivaut à: frenchMovies.push(newMovie)
    frenchMovies = [...frenchMovies, newMovie]
    res.sendStatus(201)

  }
})
app.get('/movies/add', (req, res) => {
  res.send('Add movies here')
})

app.get('/movies/:id/', (req, res) => {
  const id = req.params.id;
  
  res.render('movie-details', {movieId: id})
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})