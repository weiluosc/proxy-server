const express = require('express')
const path = require('path')

const axios = require('axios').default

const PIXEL_HOST = 'https://tr-shadow.snapchat.com'
const TRACKING_PATH = 'gateway/p'
const instance = axios.create({
  baseURL: PIXEL_HOST
});

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

  // forward headers: 
  // instance.post(TRACKING_PATH, {data:req.query}, {headers:req.headers})
  instance.post(TRACKING_PATH,req.query)
  .catch((error)=>{
    console.log(error)
    res.status(500).end()
  })
  .then((response)=>{
    console.log(response.status)
    console.log(response.config)
    res.sendStatus(response.status)
  })
})

app.get('/h', (req, res) => {
  res.sendStatus(200)
})

app.listen(8080)
