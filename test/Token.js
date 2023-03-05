const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n)=>{

    return ethers.utils.parseUnits( n.toString() , 'ether')

}

describe('Token' ,() =>{

    let token , accounts , deployer , receiver;

        //Fetching Token from Blockchain
        beforeEach(async ()=>{
            const Token = await ethers.getContractFactory('Token')
           token = await Token.deploy('mEth','mEth',1000000)

            accounts = await ethers.getSigners()
            deployer = accounts[0]
            receiver = accounts[1]
        })
    
        describe('Deployment', () => {
            const name = 'mEth'
            const symbol = 'mEth'
            const decimals = '18'
            const totalSupply = tokens('1000000')
        
            it('has correct name', async () => {
              expect(await token.name()).to.equal(name)
            })
        
            it('has correct symbol', async () => {
              expect(await token.symbol()).to.equal(symbol)
            })
        
            it('has correct decimals', async () => {
              expect(await token.decimals()).to.equal(decimals)
            })
        
            it('has correct total supply', async () => {
              expect(await token.totalSupply()).to.equal(totalSupply)
            })
        
            it('assigns total supply to deployer', async () => {
              expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
            })
        
          })

    describe('Sending Token', () =>{

        it('Transfer Token balances', async ()=>{
        
        
        //Transfer Token
       token.connect(deployer).tranfer()
        //Ensure tokens were transfered 
        })
    })
})

