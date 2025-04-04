// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FundMe} from "./FundMe.sol";

contract FundMeFactory {
    FundMe[] public allFundMeContracts; //all deployed
    mapping(address => FundMe[]) public userFundMeContracts; //specific contrsctsd

    event FundMeCreated(address indexed owner, address contractAddress);

    function create() public {
        FundMe NewFundMe = new FundMe(msg.sender);
        userFundMeContracts[msg.sender].push(NewFundMe);
        allFundMeContracts.push(NewFundMe);
        emit FundMeCreated(msg.sender, address(NewFundMe));
    }

    function getUserContracts(
        address user
    ) public view returns (address[] memory) {
        FundMe[] memory userContracts = userFundMeContracts[user];
        address[] memory contractAddresses = new address[](
            userContracts.length
        );

        for (uint256 i = 0; i < userContracts.length; i++) {
            contractAddresses[i] = address(userContracts[i]);
        }

        return contractAddresses;
    }

    function s_fund(address contractAddress) public payable {
        require(contractAddress != address(0), "Invalid contract address");
        FundMe(payable(contractAddress)).fund{value: msg.value}();
    }

    function s_withdraw(address contractAddress) public {
        require(contractAddress != address(0), "Invalid contract address");
        FundMe(payable(contractAddress)).withdraw();
    }

    function getAllContracts() public view returns (address[] memory) {
        address[] memory contracts = new address[](allFundMeContracts.length);
        for (uint256 i = 0; i < allFundMeContracts.length; i++) {
            contracts[i] = address(allFundMeContracts[i]);
        }
        return contracts;
    }
}
