// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {

  console.log("Preparing Deployment");

 //Fetch contract to deploy
  const Token = await hre.ethers.getContractFactory('Token')
  const Exchange = await hre.ethers.getContractFactory('Exchange');

  const accounts =  await hre.ethers.getSigners()
  console.log(accounts);
  



  //Deploy Contract

  //Deploying 3 ERC20 Tokens
  const mETH = await Token.deploy('mETH' , 'mETH' ,'1000000');
  await mETH.deployed()
  console.log('Token Deployed to:'+ mETH.address);

  const mDAI = await Token.deploy('mDAI' , 'mDAI' , '1000000');
  await mDAI.deployed()
  console.log('Token Deployed to:'+ mDAI.address);
  const mBTC = await Token.deploy('mBTC' , 'mBTC' , '1000000');
  await mBTC.deployed()
  console.log('Token Deployed to:'+ mBTC.address);

  const exchange = await Exchange.deploy(accounts[1].address , 10);
  await exchange.deployed();
  console.log('Exchange Deployed to:'+ exchange.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
