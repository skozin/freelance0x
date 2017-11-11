import truffleContract from 'truffle-contract'
import BigNumber from 'bignumber.js'

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


export const State = {
  Creating: -1,
  Created: 0,
  Active: 1,
  Approved: 2,
  Cancelled: 3,
}


export default class ProjectContract {

  static State = State

  static async deploy(name) {
    console.log(``)
    const {web3, accounts, Project} = await apiPromise
    const instance = await Project.new(name, {
      from: accounts[0],
      gas: 1000000,
    })
    const contract = new ProjectContract(web3, accounts[0], instance)
    await contract.initialize()
    return contract
  }

  static async at(address) {
    const {web3, accounts, Project} = await apiPromise
    const instance = await Project.at(address)
    const contract = new ProjectContract(web3, accounts[0], instance)
    await contract.initialize()
    return contract
  }

  constructor(web3, account, instance) {
    this.web3 = web3
    this.account = account
    this.instance = instance
  }

  // Fetches all contract props.
  //
  async initialize() {
    const {instance} = this
    const [name, clientAddress, contractorAddress, hourlyRate,
      timeCapMinutes, prepayFractionThousands, _] = await Promise.all([
      instance.name(),
      instance.clientAddress(),
      instance.contractorAddress(),
      instance.hourlyRate(),
      instance.timeCapMinutes(),
      instance.prepayFractionThousands(),
      this.fetch(),
    ])
    this.name = name
    this.clientAddress = String(clientAddress)
    this.contractorAddress = String(contractorAddress)
    this.hourlyRate = new BigNumber('' + hourlyRate)
    this.timeCapMinutes = timeCapMinutes.toNumber()
    this.prepayFraction = prepayFractionThousands.toNumber() / 1000
  }

  // Fetches mutable contract props.
  //
  async fetch() {
    const {instance} = this
    const [state, executionDate, endDate, minutesReported, balance] = await Promise.all([
      instance.state(),
      instance.executionDate(),
      instance.endDate(),
      instance.minutesReported(),
      this.web3.eth.getBalance(instance.address),
    ])
    this.state = state.toNumber()
    this.executionDate = executionDate.toNumber()
    this.endDate = endDate.toNumber()
    this.minutesReported = minutesReported.toNumber()
    this.balance = new BigNumber(balance)
  }

  serialize() {
    const {address, name, state, clientAddress, contractorAddress, executionDate, endDate,
      hourlyRate, timeCapMinutes, minutesReported, prepayFraction,
      balance} = this
    return {address, name, state, clientAddress, contractorAddress, executionDate, endDate,
      hourlyRate, timeCapMinutes, minutesReported, prepayFraction,
      balance
    }
  }

  get address() {
    return this.instance.address
  }

  async start() {
    await assertTxSucceeds(this.instance.setValue(42, {
      from: this.account,
      gas: 100000,
    }))
    await this.fetch()
  }

}
