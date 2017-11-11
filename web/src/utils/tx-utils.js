import BigNumber from 'bignumber.js'
import getWeb3 from './get-web3'


export async function assertTxSucceeds(txResultPromise) {
  const txProps = await inspectTransaction(txResultPromise)
  if (!txProps.success) {
    throw new Error(`transaction failed`)
  }
  return txProps
}


export async function inspectTransaction(txResultPromise) {
  const [web3, txResult] = await Promise.all([getWeb3(), txResultPromise])
  const tx = await web3.eth.getTransaction(txResult.tx)
  const {receipt} = txResult
  const success = receipt.status !== undefined
    ? receipt.status === '0x1' || receipt.status === 1 // Since Byzantium fork
    : receipt.cumulativeGasUsed < tx.gas // Before Byzantium fork (current version of TestRPC)
  const txPriceWei = new BigNumber(tx.gasPrice).times(receipt.cumulativeGasUsed)
  const events = txResult.logs
    .map(log => log.event ? {name: log.event, args: log.args} : null)
    .filter(x => !!x)
  return {result: txResult, success, txPriceWei, events}
}
