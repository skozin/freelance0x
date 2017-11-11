import truffleContract from 'truffle-contract'

import getWeb3 from '~/utils/get-web3'
import {assertTxSucceeds} from '~/utils/tx-utils'

import ProjectABI from '../../build/contracts/Project.json'


async function getAPI() {
  const web3 = await getWeb3()
  const Project = truffleContract(ProjectABI)
  Project.setProvider(web3.currentProvider)
  return {web3, Project}
}


const apiPromise = getAPI()


export default class ProjectContract {

  static async deploy(name) {
    const {web3, Project} = await apiPromise
    const instance = await Project.new(name)
    return new ProjectContract(web3, instance)
  }

  constructor(web3, instance) {
    this.web3 = web3
    this.instance = instance
  }

  async setValue(newValue) {
    await assertTxSucceeds(this.instance.setValue(newValue))
  }

  getValue() {
    return this.instance.value()
  }

}
