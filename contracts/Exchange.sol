// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/hardhat/console.sol";
import "./Token.sol";

contract Exchange {
address public feeAccount;
uint256 public feePercent;
mapping (address => mapping(address => uint256)) public tokens;
mapping (uint256 => _Order) public orders;
mapping (uint256 => bool) public orderCancelled;
mapping (uint256 => bool) public ordersFilled;
uint256 orderCount;


    event Deposit(address token , address user , uint256 amount , uint256 balance);
    event Withdraw(address token , address user , uint256 amount , uint256 balance);
    event Order(uint256 id,  
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp);

    event Trade(uint256 id ,
    address user ,
    address tokenGet ,
    uint256 amountGet , 
    address tokenGive , 
    uint256 amountGive,
    address creator,
    uint256 timestamp
      );    

    struct _Order {
        uint256 id;  
        address user;
        address tokenGet;
        uint256 amountGet;
        address tokenGive;
        uint256 amountGive;
        uint256 timestamp;
    }

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }
//---------------------------------------------------------------
    //DEPOSIT AND WITHDRAW TOKENS

    function depositToken(address _token , uint256 _amount) public {

        //Transfer tokens to exchange
        require(Token(_token).transferFrom(msg.sender , address(this) , _amount));

        //Update Users Balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;

        //Emit an event
        emit Deposit(_token, msg.sender , _amount, tokens[_token][msg.sender]);

    }

    function withdrawToken(address _token,uint256 _amount) public {
        //Transfer tokens to user
        Token(_token).transfer(msg.sender , _amount);
        
        //Update User Balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;

        //Emit an Withdrawl Event
        emit Withdraw(_token, msg.sender , _amount, tokens[_token][msg.sender]);

    }
   
    function balanceOf(address _token , address _user)  public view returns (uint256) {
        return tokens[_token][_user];
    }    

    /*
    ----------------------------------------------------------------------------
    
    MAKE AND CANCEL ORDERS 

    Token Give(Token they want to spend)
    Token Get(Token they want to receive )

     */

    function makeOrder( address _tokenGet , uint256 _amountGet , address _tokenGive , uint256 _amountGive)  
    public {
        require(balanceOf(_tokenGive , msg.sender) >= _amountGive);

        orderCount = orderCount + 1;
        orders[orderCount] =  _Order(orderCount , msg.sender , _tokenGet , _amountGet , _tokenGive , _amountGive , block.timestamp);

    }

    function orderNum() public view returns (uint256) {
        return orderCount;
    }

    function cancelOrder(uint256 _id) public {
        //Fetching the Order
        _Order storage _order = orders[_id];

        require(_order.id == _id);

        orderCancelled[_id] = true;

    }

    function fillOrder(uint256 _id) public {
        /*
        Conditions to make a trade
        1.Must be a valid order id
        2.Order must not be filled
        3.Order must not be cancelled
        */

       require(_id > 0 && _id <= orderCount , "Order does not exists");

       require(!ordersFilled[_id]);

       require(!orderCancelled[_id]);
       

         _Order storage _order = orders[_id]; //Fetching Order
        

       trade(_order.id , _order.user , _order.tokenGet , _order.amountGet , _order.tokenGive , _order.amountGive);

       ordersFilled[_order.id] = true;
    }

    function trade(uint256 _id , address user , address _tokenGet , uint256 _amountGet , address _tokenGive , uint256 _amountGive ) 
     internal {

        //Calculating the fee amount 

        uint256 feeAmount = (_amountGet * feePercent) / 100 ;

        //Swapping tokens b/w exchange , user1 and user2 

        
        tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender] - (_amountGet + feeAmount);
        tokens[_tokenGet][user] = tokens[_tokenGet][user] + _amountGet;

        tokens[_tokenGet][feeAccount] = tokens[_tokenGet][feeAccount] + feeAmount;

        tokens[_tokenGive][user] = tokens[_tokenGive][user] - _amountGive;
        tokens[_tokenGive][msg.sender] = tokens[_tokenGive][msg.sender] + _amountGive;

        emit Trade(_id , msg.sender , _tokenGet , _amountGet , _tokenGive , _amountGive , user , block.timestamp );



    }
}