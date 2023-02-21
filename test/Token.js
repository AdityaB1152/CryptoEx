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
           token = await Token.deploy()

            accounts = await ethers.getSigners()
            deployer = accounts[0]
            receiver = accounts[1]
        })
    
    it('has a name' , async () =>{

        const name = await token.name();
        expect(name).to.equal('mEth')

    })
    it('has correct symbol' , async () =>{

        const symbol = await token.symbol();
        expect(symbol).to.equal('mEth')

    })

    it('has correct decimal' , async () =>{

        const decimals = await token.decimals();
        expect(decimals).to.equal('18')

    })

    it('has correct total supply' , async () =>{

        const value = tokens('1000000')
        expect(await token.totalSupply()).to.equal(value)

    })

    describe('Sending Token', () =>{

        it('Transfer Token balances', async ()=>{
        
        
        //Transfer Token
       token.connect(deployer).tranfer()
        //Ensure tokens were transfered 
        })
    })
})

