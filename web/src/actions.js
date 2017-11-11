
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
