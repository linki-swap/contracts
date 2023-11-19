// scripts/transferTokens.ts

import { ethers, network } from "hardhat";

async function main() {
if(network.name !== `avalancheFuji`) {
    console.error(`❌ Must be called from Avalanche Fuji`);
    return 1;
}

const receiver = `0xfd446002b2979559ef4Cd06e5DCC84bbCC6b49D3`;
const ccipBnMAddress = `0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4`;
const amount = 100n;
const destinationChainSelector = 16015286601757825753;
const ccipSenderAddress = `0x1004D0e327701982Aed481a35e3475eA9b00A989`;

const linkiSwapTokenSenderFactory = await ethers.getContractFactory("LinkiSwapTokenSender");
const linkiSwapTokenSender = await linkiSwapTokenSenderFactory.connect(ccipSenderAddress, ethers.provider);

const whitelistTx = await linkiSwapTokenSender.whitelistChain(
    destinationChainSelector
);

console.log(`Whitelisted Sepolia, transaction hash: ${whitelistTx.hash}`);

const transferTx = await linkiSwapTokenSender.transferTokens(
    destinationChainSelector,
    receiver,
    ccipBnMAddress,
    amount
);

console.log(`Tokens sent, transaction hash: ${transferTx.hash}`);
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});