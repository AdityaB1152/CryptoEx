const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token' , () =>{
    it('has a name' , async () =>{
        //Fetching Token from Blockchain
        const Token = await ethers.getContractFactory('Token')
        let token =  await Token.deploy()
        //Reading Token Name
        const name = await token.name();

        //Checking if name is correct
        expect(name).to.equal('mEth')
    
    })

    it('has a symbol' , async () =>{
        //Fetching Token from Blockchain
        const Token = await ethers.getContractFactory('Token')
        let token =  await Token.deploy()
        //Reading Token Name
        const symbol = await token.symbol();

        //Checking if name is correct
        expect(symbol).to.equal('mEth')
    
    })
})