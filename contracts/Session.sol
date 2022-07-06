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
    mapping(address => uint256) public sessionProposes;
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

    modifier onlyRegistered() {
        (address _account, , , , ) = mainContract.participants(msg.sender);
        require(_account != address(0), "Not registered");
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
        productDescription = _productDescription;
        productImages = _productImages;
        finalPrice = _finalPrice;
        state = State.OPENED;
    }


    // cần update # session join ngay lần đầu propose???
    function propose(uint256 _price)
        external
        onlyRegistered
        validState(State.OPENED)
    {
        require(sessionParticipants.length < 10, "Participants need to be less than 10");
        require(_price > 0, "Price must greater than 0");
        sessionProposes[msg.sender] = _price;
        sessionParticipants.push(msg.sender);
        proposedPrice = calculateProposedPrice();
    }

    function calculateProposedPrice() public view returns (uint256) {
        require(sessionParticipants.length > 0, "No participant");

        uint256 numerator;
        uint256 denumerator;
        uint256 totalDeviation;

        for (uint256 i = 0; i < sessionParticipants.length; i++) {
            (, , , , uint256 currentDeviation) = mainContract.participants(
                sessionParticipants[i]
            );
            if (currentDeviation > 100 * 10**18) {
                currentDeviation = 100 * 10**18;
            }
            numerator =
                numerator +
                (sessionProposes[sessionParticipants[i]]) *
                (100 * 10**18 - (currentDeviation));
            totalDeviation = ((totalDeviation) + (currentDeviation));
        }
        denumerator =
            (100 * sessionParticipants.length) *
            10**18 -
            (totalDeviation); //100*3 - 200
        if (denumerator == 0) return 0;
        return numerator / denumerator;
    }

    function calculateParticipantNewdeviation(uint256 _participantSessionPrice)
        internal
        view
        returns (uint256)
    {
        require(finalPrice > 0);
        uint256 diff = finalPrice >= _participantSessionPrice
            ? (finalPrice - _participantSessionPrice)
            : (_participantSessionPrice - finalPrice);
        return (((diff * 100) * 10**18) / finalPrice);
    }

    function calculateParticipantAccumulatedDeviation(
        uint256 _currentDeviation,
        uint256 _numberOfJoinedSession,
        uint256 _newDeviation
    ) internal pure returns (uint256) {
        return
            (_currentDeviation * _numberOfJoinedSession + _newDeviation) /
            (_numberOfJoinedSession + 1);
    }

    function closeSession() external onlyAdmin validState(State.OPENED) {
        state = State.CLOSING;
    }

    function afterClosingSession(uint256 _finalPrice)
        external
        onlyAdmin
        validState(State.CLOSING)
    {
        require(_finalPrice >= 0);
        state = State.CLOSED;

        finalPrice = _finalPrice;
        // calculate and update dnew + accumulated deviation
        for (uint256 i = 0; i < sessionParticipants.length; i++) {
            // address currentParticipationAddress = sessionParticipants[i];
            (
                ,
                ,
                ,
                uint256 _numberOfJoinedSession,
                uint256 _deviation
            ) = mainContract.participants(sessionParticipants[i]);

            uint256 newDeviation = calculateParticipantNewdeviation(
                sessionProposes[sessionParticipants[i]]
            );

            uint256 accumulatedDeviation = calculateParticipantAccumulatedDeviation(
                    _deviation,
                    _numberOfJoinedSession,
                    newDeviation
            );

            mainContract.updateParticipantDeviation(
                sessionParticipants[i],
                accumulatedDeviation
            );
            
            mainContract.incrementParticipantNumberOfSession(
                sessionParticipants[i]
            );
        }
    }

    function getFinalPrice() external view returns (uint256) {
        return finalPrice;
    }

    function updateSessionDetail(
        string memory _productName,
        string memory _productDescription,
        string[] memory _productImages
    ) external onlyMainContract validState(State.OPENED) {
        productName = _productName;
        productDescription = _productDescription;
        productImages = _productImages;
    }

    function getSessionDetail() external view returns (SessionDetail memory) {
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
