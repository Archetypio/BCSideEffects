
const sideEffects = require('./sideEffects.js')
const fs = require('fs')
const web3 = require('./web3Client.js')
const code = fs.readFileSync('SideEffects.sol').toString()
const solc = require('solc')
const compiledCode = solc.compile(code)
const abiDefinition = JSON.parse(compiledCode.contracts[':SideEffects'].interface)
const SideEffectsContract = web3.eth.contract(abiDefinition)
const byteCode = compiledCode.contracts[':SideEffects'].bytecode
const deployedContract = SideEffectsContract.new(sideEffects, {
  data: byteCode,
  from: web3.eth.accounts[0],
  gas: 4700000
})

module.exports = deployedContract
