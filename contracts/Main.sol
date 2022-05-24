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
    // 
    // The account deployed the main smart contract will be set as admin account

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    // Account info of a participant and info of a pricing session will be updated when a user registered, and a pricing session created.
    modifier onlySessionContract(address _session) {
        require(msg.sender == _session, "Only session");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier validParticipant() {
        require(participants[msg.sender].account != address(0) , "Not register");
        _;
    }

    modifier isNotRegistered() {
        require(participants[msg.sender].account != msg.sender, "Registered");
        _;
    }

    function createNewSession(
        string memory _productName,
        string memory _productDescription,
        string[] memory _productImages
    ) external onlyAdmin returns (Session) {
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
        string memory _fullName,
        string memory _email
    ) external isNotRegistered {
        Participant memory newParticipant = Participant({
            account: msg.sender,
            fullName: _fullName,
            email: _email,
            numberOfJoinedSession: 0,
            deviation: 0
        });

        participants[msg.sender] = newParticipant;
        participantKeys.push(msg.sender);
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
        onlySessionContract(msg.sender)
    {
        participants[_account].deviation = _deviation;
    }

    function incrementParticipantNumberOfSession(address _account) external {
        participants[_account].numberOfJoinedSession += 1;
    }

    function getParticipants() external view returns(Participant[] memory) {
        Participant[] memory _participants = new Participant[](participantKeys.length);
        for(uint256 i=0;i< participantKeys.length;i++){
            Participant memory participant = participants[participantKeys[i]];
            _participants[i] = participant;
        }
        return _participants;
    }

    function updateSessionDetail(address _sessionAddress,string memory _productName, string memory _productDescription, string[] memory _productImages) public onlyAdmin {
        Session _session = Session(_sessionAddress);
       _session.updateSessionDetail(_productName,_productDescription,_productImages);
    }


    function getSessions() external view returns(SessionDetail[] memory) {
        SessionDetail[] memory _sessionsDetail = new SessionDetail[](sessions.length);

        for(uint256 i=0;i< sessions.length;i++){
            SessionDetail memory sessionDetail = sessions[i].getSessionDetail();
            _sessionsDetail[i] = sessionDetail;
        }
        return _sessionsDetail;
    }

    function updateParticipantDetail(string memory _fullName, string memory _email) public {
        require(msg.sender == participants[msg.sender].account, "Wrong account");
        participants[msg.sender].fullName = _fullName;
        participants[msg.sender].email = _email;
    }
}
