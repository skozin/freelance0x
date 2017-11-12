#!/bin/sh

rm -rf .blockchain
tar -xzf blockchain.tar.gz

set -x

nice -n 5 geth --dev \
  --datadir .blockchain \
  --rpc --rpcapi="db,eth,net,web3,personal" \
  --rpcport "9545" --rpcaddr "127.0.0.1" --rpccorsdomain "http://localhost:3000" \
  --mine \
  --unlock '0,1' \
  --password geth-passwords.txt \
  console
