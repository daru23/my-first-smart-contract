const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Getting arguments
let contractName = 'Inbox.sol'
if (process.argv[2]) {
    contractName = process.argv[2];
}

// Compile contract
const contractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};
let contractFile;

try {
    const tempFile = JSON.parse(solc.compile(JSON.stringify(input)), 1);
    contractFile = tempFile.contracts['Inbox.sol']['Inbox'];
} catch (e) {
    contractFile = {};
}

module.exports = contractFile;
