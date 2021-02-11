// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";


interface ICurveFiCurve {
  function get_dy_underlying(
    int128 i,
    int128 j,
    uint256 dx
  ) external view returns (uint256);
}

contract TestCurveBug {
  address curvePool = 0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51;

  function test() public view {
    console.log("Running stateless Curve function multiple times");

    for (uint256 i = 0; i < 200; i++) {
      ICurveFiCurve(curvePool).get_dy_underlying(
        int128(2),
        int128(1),
        10000000000
      );
      console.log("Successful iteration", i);
    }
  }
}