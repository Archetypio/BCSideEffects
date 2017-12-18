pragma solidity ^0.4.11;

contract SideEffects {

  mapping (bytes32 => uint8) public sideEffectsReceived;

  bytes32[] public sideEffectList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function SideEffects(bytes32[] sideEffectNames) {
    sideEffectList = sideEffectNames;
  }

  function totalSideEffectsFor(bytes32 sideEffect) returns (uint8) {
    if (validSideEffect(sideEffect) == false) throw;
    return sideEffectsReceived[sideEffect];
  }

  function incrementSideEffect(bytes32 sideEffect) {
    if (validSideEffect(sideEffect) == false) throw;
    sideEffectsReceived[sideEffect] += 1;
  }

  function validSideEffect(bytes32 sideEffect) returns (bool) {
    for(uint i = 0; i < sideEffectList.length; i++) {
      if (sideEffectList[i] == sideEffect) {
        return true;
      }
    }
    return false;
  }
}
