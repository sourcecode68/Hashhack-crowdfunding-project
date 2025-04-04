//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;
import {Test, console} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";
contract FundMeTest is Test {
    FundMe fundMe;
    function setUp() external {
        fundMe = new FundMe();
    } //this runs first the first test function then set up is again called the test function 2

    function testDemo() public view {
        assertEq(fundMe.minimumUsd(), 5e18);
    } //this runs next

    function testDemo2() public view {
        assertEq(fundMe.owner(), address(this));
    } //this runs next

    function testDemo3() public view {
        uint256 ver = fundMe.get_version();
        assertEq(ver, 4);
    } //this runs next
}
//forge test -vv(for console logs)
