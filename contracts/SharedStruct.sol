//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

enum State {
    OPENED,
    CLOSING,
    CLOSED
}

struct Participant {
    address account;
    string fullName;
    string email;
    uint256 numberOfJoinedSession;
    uint256 deviation;
}





struct SessionDetail {
    address sessionAddress;
    string productName;
    string productDescription;
    string[] productImages;
    uint256 finalPrice;
    State state;
}
