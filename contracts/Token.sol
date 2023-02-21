// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/hardhat/console.sol";

contract Token{
    string public name;
    string public symbol = "mEth";
    uint256 public decimals = 18;
    uint256 public totalSupply = 1000000 * (10**decimals); // 1000000 * 10^8 Total Supply of mEth Token
    

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 _totalSupply
    );

    constructor( string memory _name , string memory _symbol ,
    uint256 _decimals , uint256 _totalSupply
    
    ){
            name = _name;
            symbol = _symbol;
            totalSupply = _totalSupply;
            decimals = _decimals;

            balanceOf[msg.sender] = totalSupply;
       
    }

    function transfer(address _to , uint256 _value) public returns (bool success) {

        require(balanceOf[msg.sender] >= _value);
        require(_to != address(0));
        //Deduct tokens from sender 
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        //Credit tokens to reciver
        balanceOf[_to] =  balanceOf[_to] + _value;
        emit Transfer(msg.sender , _to , _value);
        return true;

    }

    function approve(address _spender , uint256 _value) public returns  (bool success) {
        
        allowance[msg.sender][ _spender ] = _value;
        
    }

    
}
