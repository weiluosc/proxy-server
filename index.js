const express = require('express')
const path = require('path')

const app = express()

const PATH_TO_PIXEL_BUNDLE = './static/sc-event.js'

app.get('/scevent.min.js', (req, res) => {
  res.set('mime-type', 'application/javascript')
  res.set('Cache-control', 'public, max-age=31536000')
  res.sendFile(path.join(__dirname, PATH_TO_PIXEL_BUNDLE))
})

app.get('/p', (req, res) => {
  console.log('Recvd')
  console.log(req.body)
  console.log(req.headers)
  res.send('GET /p')
})

app.listen(8080)
