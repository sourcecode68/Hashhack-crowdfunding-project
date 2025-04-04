// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {FundMeFactory} from "../src/FundMeFactory.sol";

contract DeployFundMeFactory is Script {
    function run() external {
        vm.startBroadcast();
        new FundMeFactory();
        vm.stopBroadcast();
    }
}
// forge script script/DeployFundMe.s.sol:DeployFundMeFactory --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
