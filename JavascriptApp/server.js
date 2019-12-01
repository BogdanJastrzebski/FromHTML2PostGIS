const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const DataFrame = require('dataframe-js').DataFrame
const {check, validationResult} = require('express-validator')


// DataFrame: packages
// Zawiera paczki.
var packages = new DataFrame([],
  ['id',
   'name',
   'size',
   'lat',
   'lng'])

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//Server
var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app at http://%s:%s", host, port)
})

// # Routing

// GET
app.get('/api/packages/', function(req, res) {
  console.log('Sending packages... ')
  if (req.query.method == 'findPath') {
    // Return path
    if (req.query.lat && req.query.lng) {
      res.json(findPath(parseFloat(req.query.lat), parseFloat(req.query.lng)))
    } else {
      res.status(400).send('Error: Missing values.')
    }
  } else {
    // Return all packages
    res.json(packages.toCollection())
  }
})

app.get('/api/packages/:id',
  function(req, res) {
    if (packages.find({id: parseInt(req.params.id)})) {
      console.log('Sending package: ', req.params.id)
      res.json(packages.where(row => row.get('id') == req.params.id).toCollection()[0])
    } else {
      return res.status(422).json({errors: 'id out of range'})
    }
})

// POST

app.post('/api/packages/',
  [
    check('name').exists().isString().isLength({min:1, max:50}),
    check('size').exists().isNumeric(),
    check('lat').isNumeric(),
    check('lng').isNumeric()
  ],
  function(req, res) {
    console.log(req.body)
    // Error handling
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
    }

    console.log('Adding package...')

    // Empty array handling
    if(packages.dim()[0] != 0) {
      req.body.id = packages.stat.max('id') + 1
    } else {
      req.body.id = 0
    }

    // Add to packages
    packages = packages.push(req.body)
    res.send('Package has been added.')
})

// DELETE

app.delete('/api/packages/:id', function(req, res) {
  if (!(packages.find({'id': parseInt(req.params.id)}))) {
    return res.status(422).json({errors: 'id out of range'})
  }
  console.log('Deleting package: ', req.params.id)
  packages = packages.filter(row => row.get('id') != req.params.id)
  res.send('Package has been deleted.')
})

// PUT

app.put('/api/packages/:id',
  [
    check('name').exists().isString().isLength({min:5, max:20}),
    check('address').exists().isString().isLength({min:10, max:100}),
    check('size').exists().isNumeric()
  ],
  function(req, res) {

    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({errors: errors.array()})
    }

    // Id
    let inner_id = packages.find(row => row.get('id') == req.params.id)

    if(!inner_id) {
      return res.status(422).json({errors: 'id out of range'})
    } else {
      inner_id = inner_id.id
    }

    console.log('Updating row: ', req.params.id)

    req.body.id = parseInt(req.params.id)
    packages = packages
      .filter(row => row.get('id') != req.params.id)
      .push(req.body)
      .sortBy('id')

    res.send("Package has been updated.")

})

function findPath(lat, lng) {
  let points = packages.select('id', 'lat', 'lng')

  let startend = [parseFloat(lat), parseFloat(lng)]
  let cycle = [startend]
  let n = points.dim()[0]
  for(i = 0; i<n; i++) {
    // Count Distance
    points = points.withColumn('distance',
      row => Math.pow(lat - row.get('lat'), 2) + Math.pow(lng - row.get('lng'), 2))
    // Find min distace row
    minPoint = points.find({distance: points.stat.min('distance')})
    // Add it to the cycle
    cycle.push([minPoint.get('lat'), minPoint.get('lng')])
    // Get rid of it, as it is already checked
    points = points.filter(row => row.get('id') != minPoint.get('id'))
    // Update last row lat and lng
    lat = minPoint.get('lat')
    lng = minPoint.get('lng')
  }
  cycle.push(startend)
  return cycle
}
