import express from 'express'
import { engine }  from 'express-handlebars'
import fs from 'fs'
import { fetchPhotos } from './answers/Challenge2';

const app = express();
const port = 3000;

app.use(express.static('public'))

app.engine('handlebars', engine({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}))

app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (_, res) => {
  res.render('home')
});

app.get('/challenge1', (_, res) => {
  const content = fs.readFileSync('./answers/Challenge1.ts').toString('utf-8')

  res.render('challenge1', {
    response: content,
  })
})

app.get('/challenge2', async (_, res) => {
  const content = fs.readFileSync('./answers/Challenge2.ts').toString('utf-8')
  const photos = await fetchPhotos()
  res.render('challenge2', {
    response: content,
    photos: JSON.stringify(photos),
  })
})

app.get('/challenge3', async (_, res) => {
  res.render('challenge3')
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
