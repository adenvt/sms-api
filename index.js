const express = require('express')
const mqtt = require('mqtt')
const bodyParser = require('body-parser')
const app = express()
const client = mqtt.connect('tcp://iot.eclipse.org:1883')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.end('<h1>SMS API by Ade Novid!</h1>')
})

app.post('/sms', (req, res) => {
  let no = req.body.no
  let message = req.body.message

  if (!no || !message) {
    res.json({
      success: false,
      message: 'Parameter no or message can\'t be empty!'
    })
    return
  }

  client.publish('sendSMS', JSON.stringify({ no, message }))
  res.json({success: true, message: 'OK'})
})

app.listen(8080, () => {
  console.log('Listening on port 8080!')
  client.on('connect', () => {
    console.log('Connected to MTQQ Server!')
  })
})
