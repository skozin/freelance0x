
//
// Connection-related actions
//

failedToConnect.type = 'FAILED_TO_CONNECT'

export function failedToConnect(errorMessage) {
  return {
    type: failedToConnect.type,
    errorMessage,
  }
}

connected.type = 'CONNECTED'

export function connected(address) {
  return {
    type: connected.type,
    address,
  }
}

//
// Contract-related actions
//

setContractsList.type = 'SET_CONTRACTS_LIST'

export function setContractsList(contractsById) {
  return {
    type: setContractsList.type,
    contractsById,
  }
}

updateContract.type = 'UPDATE_CONTRACT'

export function updateContract(contract, ephemeralAddress) {
  return {
    type: updateContract.type,
    contract,
    ephemeralAddress,
  }
}

createContract.type = 'CREATE_CONTRACT'

export function createContract(name) {
  const ephemeralAddress = 'new-' + Date.now() + '-' + Math.floor(100000 * Math.random())
  return {
    type: createContract.type,
    name,
    ephemeralAddress,
  }
}

contractCreationFailed.type = 'CONTRACT_CREATION_FAILED'

export function contractCreationFailed(ephemeralAddress, errorMessage) {
  return {
    type: contractCreationFailed.type,
    ephemeralAddress,
    errorMessage,
  }
}

startContract.type = 'START_CONTRACT'

export function startContract(address) {
  return {
    type: startContract.type,
    address,
  }
}
