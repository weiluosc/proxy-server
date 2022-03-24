const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');

const app = express()

const PATH_TO_PIXEL_BUNDLE = './static/sc-event.js'
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/scevent.min.js', (req, res) => {
  res.set('mime-type', 'application/javascript')
  res.set('Cache-control', 'public, max-age=31536000')
  res.sendFile(path.join(__dirname, PATH_TO_PIXEL_BUNDLE))
})

app.get('/p', (req, res) => {
  console.log('Recvd')
  console.log(req.body)
  res.end()
})

app.post('/p', (req, res) => {
  console.log('Receive request from /p endpoint', req.body);
  // construct post body in JSON format
  res.sendStatus(200);
})

app.listen(8080)
