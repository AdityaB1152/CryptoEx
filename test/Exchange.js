/* eslint-disable no-undef */
const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n)=>{

    return ethers.utils.parseUnits( n.toString() , 'ether')

}

describe('Exchange',() =>{
    let deployer , feeAccount , exchange 

    const feePercent = 10

    beforeEach(async ()=>{
        
        const Exchange = await ethers.getContractFactory('Exchange')
        const Token = await ethers.getContractFactory('Token')
        token1 = await Token.deploy('mEth','mEth',1000000)
        token2 = await Token.deploy('mBtc','mBtc',1000000)
        
        accounts = await ethers.getSigners()
        deployer = accounts[0];
        feeAccount = accounts[1];
        user1 = accounts[2];
        user2 = accounts[3];

        let transaction = await token1.connect(deployer).transfer(user1.address , tokens(100))
        await transaction.wait()

        exchange = await Exchange.deploy(feeAccount.address , feePercent)
    })

    describe('Deployment',() =>{
        it('tracks the fee account',async () => {
            expect(await exchange.feeAccount()).to.equal(feeAccount.address)
        })

        it('tracks fee percentage',async () => {
            expect(await exchange.feePercent()).to.equal(feePercent)
        })
    })

    describe('Depositing Tokens', () => {
        let transaction, result
        let amount = tokens(10)
    
        describe('Success', () => {
          beforeEach(async () => {
            // Approve Token
            transaction = await token1.connect(user1).approve(exchange.address, amount)
            result = await transaction.wait()
            // Deposit token
            transaction = await exchange.connect(user1).depositToken(token1.address, amount)
            result = await transaction.wait()
          })
    
          it('tracks the token deposit', async () => {
            expect(await token1.balanceOf(exchange.address)).to.equal(amount)
            expect(await exchange.tokens(token1.address, user1.address)).to.equal(amount)
            expect(await exchange.balanceOf(token1.address , user1.address)).to.equal(amount)
            
          })

          it('emits an Deposit event' , async () => {

            const event = result.events[1]
            expect(event.event).to.equal('Deposit')

            const args = event.args
            expect(args.token).to.equal(token1.address)
            expect(args.user).to.equal(user1.address)
            expect(args.amount).to.equal(amount)
            expect(args.balance).to.equal(amount)

          })
        })
    
        describe('Failure', () => {
         
        })
    
      })

      describe('Withdrawing Tokens', () =>{

        let transaction , result
        let amount = tokens(10)

        describe('Success', async () =>{
            beforeEach(async () =>{
                // Approve Token
            transaction = await token1.connect(user1).approve(exchange.address, amount)
            result = await transaction.wait()
            // Deposit token
            transaction = await exchange.connect(user1).depositToken(token1.address, amount)
            result = await transaction.wait()
            // Now Withdraw Tokens
            transaction = await exchange.connect(user1).withdrawToken(token1.address , amount)
            result = await transaction.wait()
        
            })

            it('withdraws the token funds', async () => {
                expect(await token1.balanceOf(exchange.address)).to.equal(0)
                expect(await exchange.tokens(token1.address, user1.address)).to.equal(0)
                expect(await exchange.balanceOf(token1.address , user1.address)).to.equal(0)
                
              })

              it('emits an Withdraw event' , async () => {

                const event = result.events[1]
                expect(event.event).to.equal('Withdraw')
    
                const args = event.args
                expect(args.token).to.equal(token1.address)
                expect(args.user).to.equal(user1.address)
                expect(args.amount).to.equal(amount)
                expect(args.balance).to.equal(0)
    
              })
        })
       
      })

      describe('Making Orders' , async () =>{

        let transaction
        let amount = tokens(10)
        describe('Success',async ()=>{
            beforeEach(async ()=>{
                    // Approve Token
            transaction = await token1.connect(user1).approve(exchange.address, amount)
            result = await transaction.wait()
            // Deposit token
            transaction = await exchange.connect(user1).depositToken(token1.address, amount)
            result = await transaction.wait()
            //Make Order

            transaction = await exchange.connect(user1).makeOrder(token2.address , tokens(1) , token1.address , tokens(1));
            result = await transaction.wait()
            })

            it('tracks newly created orders' , async ()=>{
                
                expect(await exchange.orderNum()).to.equal(1);
            })

        })

        describe('Failure',async ()=>{
            
        })
      })

      describe('Filling Orders' , async () =>{
        transaction = await exchange.connect(user2).fillOrder('1')
        result = await transaction.wait()

      })
})