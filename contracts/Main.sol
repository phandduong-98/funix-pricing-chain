//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./Session.sol";
import "./SharedStruct.sol";

contract Main {
    /*
        The00-Main.sol file should contain information of each participant, including account, full name, email, number of pricing session he has joined, and deviation 
    */

    // stores a `Participant` struct for each possible address.
    address[] public participantKeys;
    mapping(address => Participant) public participants;

    //The smart contract should contain the hash of all the pricing sessions.
    Session[] public sessions;

    // The account deployed the main smart contract will be set as admin account

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    // Account info of a participant and info of a pricing session will be updated when a user registered, and a pricing session created.

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    modifier validParticipant(address _account) {
        require(msg.sender == _account, "Not allow");
        _;
    }

    function createNewSession(
        string memory _productName,
        string memory _productDescription,
        string[] memory _productImages
    ) external returns (Session) {
        Session newSession = new Session(
            address(this),
            admin,
            _productName,
            _productDescription,
            _productImages,
            0,
            0
        );
        sessions.push(newSession);
        return newSession;
    }

    function register(
        address _account,
        string memory _fullName,
        string memory _email
    ) external {
        Participant memory newParticipant = Participant({
            account: _account,
            fullName: _fullName,
            email: _email,
            numberOfJoinedSession: 0,
            deviation: 0
        });

        participants[_account] = newParticipant;
        participantKeys.push(_account);
    }

    function getParticipantDeviation(address _account)
        external
        view
        returns (uint256)
    {
        return participants[_account].deviation;
    }

    function getParticipantNumberOfJoinedSession(address _account)
        external
        view
        returns (uint256)
    {
        return participants[_account].numberOfJoinedSession;
    }

    function updateParticipantDeviation(address _account, uint256 _deviation)
        external
    {
        participants[_account].deviation = _deviation;
    }

    function incrementParticipantNumberOfSession(address _account) external {
        participants[_account].numberOfJoinedSession += 1;
    }

    function setAccumulatedDeviation(address _account, uint256 _newAccumulatedDeviation) external {
        participants[_account].deviation = _newAccumulatedDeviation;
    }
}
