// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

error FundMe__NotOwner();
//    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
import {PriceConverter} from "./PriceConverter.sol";
contract FundMe {
    // using PriceConverter for uint256;
    uint256 public constant minimumUsd = 5e18;
    address[] public fundsList;
    mapping(address funder => uint256 amount) funders;
    address public immutable owner;
    constructor() {
        owner = msg.sender; //the one who deploys the contract will call the constructor and will be the sender
    }
    function fund() public payable {
        //gas will be sent for failed transactions
        // uint256 usd_recvd=msg.value.getConversionRate();//the caller acts as the first parameter and second parameter inside the brackets
        uint256 usd_recvd = PriceConverter.getConversionRate(msg.value); //this method works as well

        require(usd_recvd >= minimumUsd, "didnt send enough eth");
        fundsList.push(msg.sender);
        funders[msg.sender] = funders[msg.sender] + msg.value;
    }
    function get_version() public view returns (uint256) {
        AggregatorV3Interface priceFeed;
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );

        return priceFeed.version();
    }
    function withdraw() public onlyOwner {
        //require(msg.sender == owner, "no permission");
        for (uint256 i = 0; i < fundsList.length; i++) {
            address funder = fundsList[i];
            funders[funder] = 0;
        }
        fundsList = new address[](0);
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "Failed to send Ether");
    }
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert FundMe__NotOwner();
        }

        //_; execute the code first in the function and then modifier
        //require(msg.sender == owner, "No permission");
        _; //everything else in the function this line means
        //_ means go back to function and then come back
    }

    //directly send money through waallet
    receive() external payable {
        fund();
    }
    fallback() external payable {
        fund();
    }
}

//constant -constant when declared
//immutable- set once after declaration
//msg.sender only when inside a function
/*Key Features of immutable:

    Set Only Once → You can assign a value only in the constructor.

    Cannot Change → Once set, the value remains constant for the contract's lifetime.

    Gas Optimization → immutable variables reduce gas costs compared to regular state variables stored in storage.*/

//revert does smae as require without condition use with if stateme nt
