import truffleContract from 'truffle-contract'
import BigNumber from 'bignumber.js'

import getWeb3 from '~/utils/get-web3'
import {assertTxSucceeds} from '~/utils/tx-utils'

import ProjectABI from '../../build/contracts/Project.json'


const accountIndex = (() => {
  const match = /[?]acc(?:ount)?=(\d+)/.exec(window.location.search)
  console.debug('acct match:', match)
  return (match && match[1]) ? +match[1] : 0
})()


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
  return accounts[accountIndex]
}


export const State = {
  NotFound: -3,
  Fetching: -2,
  Creating: -1,
  Created: 0,
  Active: 1,
  Approved: 2,
  Cancelled: 3,
}


export const Role = {
  Stranger: 0,
  Contractor: 1,
  Client: 2,
}


export default class ProjectContract {

  static State = State
  static Role = Role

  static async deploy(name, clientAddress, hourlyRate, timeCapMinutes, prepayFractionThousands) {
    const {web3, accounts, Project} = await apiPromise
    const instance = await Project.new(
      name, clientAddress, hourlyRate, timeCapMinutes, prepayFractionThousands,
      {
        from: accounts[accountIndex],
        gas: 4000000,
      }
    )
    const contract = new ProjectContract(web3, accounts[accountIndex], instance)
    await contract.initialize()
    return contract
  }

  static async at(address) {
    const {web3, accounts, Project} = await apiPromise
    const instance = await Project.at(address).then(x => x)
    const contract = new ProjectContract(web3, accounts[accountIndex], instance)
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
    const txOpts = {from: this.account}
    const [name, clientAddress, contractorAddress, hourlyRate,
      timeCapMinutes, prepayFractionThousands, myRole, _] = await Promise.all([
      instance.name(txOpts),
      instance.clientAddress(txOpts),
      instance.contractorAddress(txOpts),
      instance.hourlyRate(txOpts),
      instance.timeCapMinutes(txOpts),
      instance.prepayFractionThousands(txOpts),
      instance.getRole(txOpts),
      this.fetch(),
    ])
    this.name = name
    this.clientAddress = String(clientAddress)
    this.contractorAddress = String(contractorAddress)
    this.hourlyRate = new BigNumber('' + hourlyRate)
    this.timeCapMinutes = timeCapMinutes.toNumber()
    this.prepayFraction = prepayFractionThousands.toNumber() / 1000
    this.myRole = myRole.toNumber();
    console.debug(`contract ${this.address}, role ${this.myRole}`)
  }

  // Fetches mutable contract props.
  //
  async fetch() {
    const {instance} = this
    const txOpts = {from: this.account}
    const [state, executionDate, endDate, minutesReported,
      lastActivityDate, availableForWithdraw, balance] =
    await Promise.all([
      instance.state(txOpts),
      instance.executionDate(txOpts),
      instance.endDate(txOpts),
      instance.minutesReported(txOpts),
      instance.lastActivityDate(txOpts),
      instance.availableForWithdraw(txOpts),
      this.web3.eth.getBalance(instance.address),
    ])
    this.state = state.toNumber()
    this.executionDate = executionDate.toNumber()
    this.endDate = endDate.toNumber()
    this.minutesReported = minutesReported.toNumber()
    this.lastActivityDate = lastActivityDate.toNumber()
    this.availableForWithdraw = new BigNumber(availableForWithdraw)
    this.balance = new BigNumber(balance)
  }

  serialize() {
    const {address, name, state, clientAddress, contractorAddress, executionDate, endDate,
      hourlyRate, timeCapMinutes, minutesReported, prepayFraction,
      balance, myRole, lastActivityDate, availableForWithdraw,} = this
    return {address, name, state, clientAddress, contractorAddress, executionDate, endDate,
      hourlyRate, timeCapMinutes, minutesReported, prepayFraction,
      balance, myRole, lastActivityDate, availableForWithdraw,
    }
  }

  get address() {
    return this.instance.address
  }

  start() {
    return this._invokeInstanceFunction('start', 4000000, '25000000000000000000')
  }

  setBillableTime(timeMinutes, comment) {
    return this._invokeInstanceFunction('setBillableTime', 4000000, 0, [timeMinutes, comment])
  }

  approve() {
    return this._invokeInstanceFunction('approve', 4000000)
  }

  cancel() {
    return this._invokeInstanceFunction('cancel', 4000000, 0)
  }

  withdraw() {
    return this._invokeInstanceFunction('withdraw', 4000000, 0)
  }

  leaveFeedback(positive, comment) {
    return this._invokeInstanceFunction('leaveFeedback', 4000000, 0, [positive, comment])
  }

  async _invokeInstanceFunction(name, gas, value, args = []) {
    await assertTxSucceeds(this.instance[name](...args, {
      from: this.account,
      gas: gas,
      value: value,
    }))
    await this.fetch()
  }

}
