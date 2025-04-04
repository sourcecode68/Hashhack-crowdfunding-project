// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice() internal view returns (uint256) {
        AggregatorV3Interface priceFeed;
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        int256 answer;
        (, answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer * 1e10);
    }
    function getConversionRate(
        uint256 eth_amount
    ) internal view returns (uint256) {
        uint256 eth_price = getPrice();
        uint256 usd_amount = (eth_amount * eth_price) / 1e18;
        return usd_amount;
    }
}
