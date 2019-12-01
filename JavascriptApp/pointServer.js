const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const DataFrame = require('dataframe-js').DataFrame
const {check, validationResult} = require('express-validator')

// DataBase

var points = new DataFrame([],
  [
    'id',
    'x',
    'y',
    'name'
  ])

// Aplikacja

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// Server

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("PointService starting at http://%s:%s", host, port)
})

// Routing

// Get

app.get('/api/points', function(req, res) {
  if (!req.query.x) {
    pointsFiltered = points
  } else {
    pointsFiltered = points.filter({x: parseFloat(req.query.x)})
  }

  res.json(pointsFiltered.toCollection())
})

app.get('/api/points/:id', function(req, res) {

  if (points.find({id: parseInt(req.params.id)})) {
    return res.json(
      points.filter(
        {id: parseInt(req.params.id)}).toCollection()[0])
  } else {
    return res.status(422).json({errors: "Id out of range"})
  }

})

// POST

app.post('/api/points',
  [
    check('name').isString(),
    check('x').isNumeric({gt:0, lt:100})
  ],
  function(req, res) {
      // Error handling
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
      }

      // Empty dataframe handling
      if(points.dim()[0] != 0) {
        req.body.id = points.stat.max('id') + 1
      } else {
        req.body.id = 0
      }

      points = points.push(req.body)
      res.send('Point has been added.')

})

// DELETE

app.delete('/api/points/:id', function(req, res) {
  let id = parseInt(req.params.id)
  if (points.find({id:id})) {
    points = points.filter(row => row.get('id') != id)
    res.send('Point has been deleted.')
  } else {
    res.status(422).send('No package with this ID exists.')
  }
})
