const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

const axios = require('axios').default

const PIXEL_HOST = 'https://tr-shadow.snapchat.com'
const TRACKING_PATH = 'gateway/p'
const instance = axios.create({
  baseURL: PIXEL_HOST
});

const app = express()

const PATH_TO_PIXEL_BUNDLE = './static/sc-event.js'
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/scevent.min.js', (req, res) => {
  res.set('mime-type', 'application/javascript')
  res.set('Cache-control', 'public, max-age=31536000')
  res.sendFile(path.join(__dirname, PATH_TO_PIXEL_BUNDLE))
})

app.route('/p')
.get((req, res) => {
  console.log('Recvd get')
  console.log(req.query)
  // forward headers: 
  // instance.post(TRACKING_PATH, {data:req.query}, {headers:req.headers})
  instance.post(TRACKING_PATH,req.query)
  .catch((error)=>{
    console.log(error)
    res.status(500).end()
  })
  .then((response)=>{
    console.log(response)
    res.end()
  })
})
.post((req, res) => {
  console.log('Recvd post')
  console.log(req.body)
  console.log(req.headers)
  headers = {
      'User-Agent': req.headers['user-agent'],
      'X-Forwarded-For': req.headers['x-forwarded-for']
      // 'Referer': req.headers['referer']
  }

  // forward headers: 
  //instance.post(TRACKING_PATH, {data:req.body}, {headers:req.headers})
  instance.post(TRACKING_PATH,req.body, {headers:headers})
  .catch((error)=>{
    console.log(error)
    res.status(500).end();
  })
  .then((response)=>{
    console.log(response)
    res.end()
  })
})

app.listen(8080)
