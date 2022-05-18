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

    enum State {
        CREATED,
        STARTED,
        CLOSING,
        CLOSED
    }
    State public state = State.CREATED; //

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
        productName = _productName;
        productDescription = _productDescription;
        proposedPrice = _proposedPrice;
        finalPrice = _finalPrice;
        productImages = _productImages;
    }

    function getSessionParticipants() external view returns(address[] memory) {
        return sessionParticipants;
    }

    function getParticipantDeviation(address _account)
        external
        view
        returns (uint256)
    {
        return mainContract.getParticipantDeviation(_account);
    }

    function getParticipantProposedPrice(address _account)
        public
        view
        returns (uint256)
    {
        return sessionProposes[_account].price;
    }

    function propose(address _account, uint256 _price) external {
        if (
            sessionProposes[_account].account == address(0) &&
            sessionProposes[_account].price == 0
        ) {
            SessionPropose memory newPropose = SessionPropose({
                account: _account,
                price: 0
            });
            sessionProposes[_account] = newPropose;
            sessionParticipants.push(_account);
        }
        sessionProposes[_account].price = _price;
    }

    //them only admin

    function calculateProposedPrice() external {
        
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

    function closeSession() external {
        //set state -> closing / 1. timeout 2. admin an close 
    }

    function afterClosingSession(uint256 _finalPrice) external {
        
        require(_finalPrice > 0, "No final price");
        // set state = closed vao day

        finalPrice = _finalPrice;
        

        for(uint i=0; i < sessionParticipants.length; i++){

            address currentParticipationAddress = sessionParticipants[i];
            uint256 currentDeviation = mainContract.getParticipantDeviation(currentParticipationAddress);
            uint256 participantProposedPrice = getParticipantProposedPrice(currentParticipationAddress);
            uint256 newDeviation = calculateParticipantNewdeviation(participantProposedPrice);
            uint256 participantNumberOfJoinedSession = mainContract.getParticipantNumberOfJoinedSession(currentParticipationAddress);
            uint256 accumulatedDeviation = calculateParticipantAccumulatedDeviation(currentDeviation, participantNumberOfJoinedSession, newDeviation);

            mainContract.incrementParticipantNumberOfSession(currentParticipationAddress);
            mainContract.setAccumulatedDeviation(currentParticipationAddress, accumulatedDeviation);
        }

    }

}
