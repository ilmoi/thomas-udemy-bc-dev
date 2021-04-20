const path = require('path')
require('dotenv').config({path:'./.env'})
const HDWalletProvider = require('@truffle/hdwallet-provider')
const AccountIndex = 0

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "vapp/src/contracts"),
  networks: {
    my_ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    infura_ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC,
          "https://ropsten.infura.io/v3/ce0c2c5a809d408892888f67e83bf5e4",
          AccountIndex)
      },
      network_id: '3', //ropsten is 3
    },
  },
  compilers: {
    solc: {
      version: '0.8.0',
    },
  },
};
