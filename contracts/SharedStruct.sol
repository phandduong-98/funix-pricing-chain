//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

struct Participant {
    address account;
    string fullName;
    string email;
    uint256 numberOfJoinedSession;
    uint256 deviation;
}

struct SessionPropose {
    address account;
    uint256 price;
}
