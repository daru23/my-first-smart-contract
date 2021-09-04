require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
// ENV variables
const phrase = process.env.MNEMONIC_PHRASE;
const providerOrUrl = process.env.PROVIDER_URL;
// Provider
const provider = new HDWalletProvider({
    mnemonic: { phrase },
    providerOrUrl
});

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: ["My first deploy!"],
        })
        .send({
            from: accounts[0],
            gas: 1500000,
            gasPrice: "5000000000"
        });
    return {
        message: `Contract deployed to ${result.options.address}`
    }
};

deploy().then((result) => {
    console.log(result.message);
    process.exit(0);
}).catch((e) => {
    console.log(e);
    process.exit(1);
});

