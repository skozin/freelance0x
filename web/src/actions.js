
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

createProject.type = 'CREATE_PROJECT'

export function createProject(name) {
  return {
    type: createProject.type,
    name,
  }
}

projectCreated.type = 'PROJECT_CREATED'

export function projectCreated(project) {
  return {
    type: projectCreated.type,
    project,
  }
}
