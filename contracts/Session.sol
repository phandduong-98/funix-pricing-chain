//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./Main.sol";
import "./SharedStruct.sol";

contract Session {
    /*     
    The Smart contract instance will maintain:
    - Product name
    - Product description
    - A list of hash that refer to Product images stored on IPFS.
    - List of participants
    - All given price of participants
    - The proposed price (calculated based on all given price and participants’ deviation)
    - The final price (get updated when the session end)
    - State of pricing session 
*/

    string public productName;
    string public productDescription;
    string[] productImages;
    address[] public sessionParticipants;
    mapping(address => SessionPropose) public sessionProposes;
    uint256 public proposedPrice;
    uint256 public finalPrice;
    address public admin; 
    Main public mainContract;
    State public state; //

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }
    modifier onlyMainContract() {
        require(msg.sender == address(mainContract), "Only main contract");
        _;
    }

    modifier validState(State _expectedState) {
        require(state == _expectedState, "Wrong state");
        _;
    }

    modifier validParticipant(address _account) {
        require(_account == msg.sender, "Wrong account");
        _;
    }

    constructor(
        address _mainContract,
        address _admin,
        string memory _productName,
        string memory _productDescription,
        string[] memory _productImages,
        uint256 _proposedPrice,
        uint256 _finalPrice
    ) {
        mainContract = Main(_mainContract);
        admin = _admin;
        proposedPrice = _proposedPrice;
        productName = _productName;
        productDescription =  _productDescription;
        productImages = _productImages;
        finalPrice = _finalPrice;
        state = State.OPENED;
    }

    function getSessionParticipants() onlyAdmin external view returns(address[] memory) {
        return sessionParticipants;
    }

    function getParticipantDeviation(address _account)
        internal
        view

        returns (uint256)
    {
        return mainContract.getParticipantDeviation(_account);
    }

    function getParticipantProposedPrice(address _account)
        public
        view
        validParticipant(msg.sender)
        returns (uint256)
    {
        return sessionProposes[_account].price;
    }

    function propose(uint256 _price) external validParticipant(msg.sender) {

        if (
            sessionProposes[msg.sender].account == address(0) &&
            sessionProposes[msg.sender].price == 0
        ) {
            SessionPropose memory newPropose = SessionPropose({
                account: msg.sender,
                price: 0
            });
            sessionProposes[msg.sender] = newPropose;
            sessionParticipants.push(msg.sender);
        }
        sessionProposes[msg.sender].price = _price;
    }

    //them only admin

    function calculateProposedPrice() external {
        // require(state == State.STARTED || state == State.CLOSING, "Wrong state");
        require(sessionParticipants.length > 0, "No participant");
        
        uint256 numerator;
        uint256 denumerator;
        uint256 totalDeviation;

        for (uint256 i = 0; i < sessionParticipants.length; i++) {
            numerator += sessionProposes[sessionParticipants[i]].price * (100 - mainContract.getParticipantDeviation(sessionParticipants[i]));
            totalDeviation += mainContract.getParticipantDeviation(sessionParticipants[i]);
        }
        denumerator = (100 * sessionParticipants.length) - totalDeviation;
        proposedPrice = numerator / denumerator;
    }


    function calculateParticipantNewdeviation(uint256 _participantSessionPrice) internal view returns(uint256) {
        require(finalPrice > 0, "No final price");

        uint256 diff = finalPrice >= _participantSessionPrice ? (finalPrice - _participantSessionPrice) : (_participantSessionPrice - finalPrice);
        return (diff * 100) / finalPrice;
    }

    function calculateParticipantAccumulatedDeviation(uint256 _currentDeviation, uint256 _numberOfJoinedSession, uint256 _newDeviation) internal pure returns(uint256){      
        return (_currentDeviation * _numberOfJoinedSession + _newDeviation) / (_numberOfJoinedSession + 1);
    }

    //State start bid closing end 
    //State onging end

    function closeSession() external onlyAdmin  {
        state = State.CLOSING;
    }

    function afterClosingSession(uint256 _finalPrice) external onlyAdmin {
        
        require(_finalPrice > 0, "No final price");
        // set state = closed vao day
        state = State.CLOSED;

        finalPrice = _finalPrice;
        
        // calculate and update dnew + accumulated deviation
        for(uint i=0; i < sessionParticipants.length; i++){

            address currentParticipationAddress = sessionParticipants[i];
            uint256 currentDeviation = mainContract.getParticipantDeviation(currentParticipationAddress);
            uint256 participantProposedPrice = getParticipantProposedPrice(currentParticipationAddress);
            uint256 newDeviation = calculateParticipantNewdeviation(participantProposedPrice);
            uint256 participantNumberOfJoinedSession = mainContract.getParticipantNumberOfJoinedSession(currentParticipationAddress);
            uint256 accumulatedDeviation = calculateParticipantAccumulatedDeviation(currentDeviation, participantNumberOfJoinedSession, newDeviation);

            mainContract.incrementParticipantNumberOfSession(currentParticipationAddress);
            mainContract.updateParticipantDeviation(currentParticipationAddress, accumulatedDeviation);
        }

        // updateSessionDetail(sessionDetail.productName, sessionDetail.productDescription, sessionDetail.productImages, finalPrice, state);
    }

    function getFinalPrice() external view returns(uint256){
        return finalPrice;
    }

    function updateSessionDetail(string memory _productName, string memory _productDescription, string[] memory _productImages) external onlyMainContract {
        productName = _productName;
        productDescription = _productDescription;
        productImages = _productImages;
    }

    function getSessionDetail() external view returns(SessionDetail memory) {
        SessionDetail memory _sessionDetail = SessionDetail({
            sessionAddress: address(this),
            productName: productName,
            productDescription: productDescription,
            productImages: productImages,
            finalPrice: finalPrice,
            state: state
        });
        return _sessionDetail;
    }
}
