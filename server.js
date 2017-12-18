// Load the express webserver
const express = require('express')

// The deployContract source is code that will be run once
// at blockchain initialization to load the contract onto
// the blockchain.
const contractInstance = require('./deployContract.js')

// Simple loader for the web3 client
const web3 = require('./web3Client.js')

// The app constant is the express instance.
const app = express()

// 
const bodyParser = require('body-parser')
const sideEffects = require('./sideEffects.js')
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'public/index.html'))
})

app.post('/increment', function(req, res) {
  try {
    const sideEffectName = req.body.sideEffectName.trim()
    contractInstance.incrementSideEffect(sideEffectName, {
      from: web3.eth.accounts[0]
    }, function(result) {
      const totalSideEffects = contractInstance.totalSideEffectsFor.call(sideEffectName, {
        from: web3.eth.accounts[0]
      }).toString()
      res.send({
        total: totalSideEffects,
        name: sideEffectName
      })
    })
  } catch (e) {
    res.status('400').send(`Failed! ${e}`)
  }
})

app.get('/side-effects', function(req, res) {
  try {
    const totalSideEffects = sideEffects.map(function(sideEffectName) {
      const sideEffectCount = contractInstance.totalSideEffectsFor.call(sideEffectName, {
        from: web3.eth.accounts[0]
      }).toString()
      return {
        name: sideEffectName,
        total: sideEffectCount,
      }
    })
    res.send({
      sideEffects: totalSideEffects
    })
  } catch (e) {
    res.status('400').send(`Failed! ${e}`)
  }
})

app.listen(3000, function() {
  console.log('App ready and listening on port 3000!')
})
