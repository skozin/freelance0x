import truffleContract from 'truffle-contract'

import getWeb3 from '~/utils/get-web3'
import {assertTxSucceeds} from '~/utils/tx-utils'

import ProjectABI from '../../build/contracts/Project.json'


async function getAPI() {
  const web3 = await getWeb3()
  const accounts = await web3.eth.accounts
  const Project = truffleContract(ProjectABI)
  Project.setProvider(web3.currentProvider)
  return {web3, accounts, Project}
}


const apiPromise = getAPI()


export async function getAccount() {
  const {accounts} = await apiPromise
  return accounts[0]
}


export default class ProjectContract {

  static async deploy(name) {
    const {web3, accounts, Project} = await apiPromise
    const instance = await Project.new(name, {from: accounts[0]})
    return new ProjectContract(web3, accounts, instance)
  }

  constructor(web3, accounts, instance) {
    this.web3 = web3
    this.accounts = accounts
    this.instance = instance
  }

  get address() {
    return this.instance && this.instance.address
  }

  async setValue(newValue) {
    await assertTxSucceeds(this.instance.setValue(newValue, {from: web3.eth.accounts[0]}))
  }

  getValue() {
    return this.instance.value()
  }

}
