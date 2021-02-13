const Pusher = require('pusher')
const express = require('express')
const cors = require('cors')
const DataManager = require('./data')

const app = express()
let port = process.env.PORT;
if (port === null || port === "") {
  port = 8000;
}
const pusher = new Pusher({
  appId: '1080159',
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'ap4',
  useTLS: true
})
const manager = new DataManager()

app.use(cors())
app.use(express.json())

app.post('/sendMessage', (req, res) => {
  manager.readData('messages.json').then((data, err) => {
    if (err) console.log(err, err.stack)
    else {
      data = JSON.parse(data.Body.toString())
      data.messages = [...data.messages, req.body]
      manager.uploadData('messages.json', data).then(() => {
        pusher.trigger('chatroom_xyz', 'message', req.body)
        res.end()
      })
    }
  })
})

app.get('/getMessages', (req, res) => {
  manager.readData('messages.json').then((data, err) => {
    if (err) console.log(err, err.stack)
    else {
      res.json(JSON.parse(data.Body.toString()))
    }
  })
})

app.listen(port, () =>
  console.log(`Listening for messages at http://localhost:${port}/sendMessage`)
)
