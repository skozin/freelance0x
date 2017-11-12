pragma solidity ^0.4.18;

contract Project {

  enum State {
    Created,
    Active,
    Approved,
    Cancelled
  }

  enum Role {
    Stranger,
    Contractor,
    Client
  }

  string public name;
  State public state;

  address public clientAddress;
  address public contractorAddress;

  uint32 public prepayFractionThousands;
  uint32 public timeCapMinutes;

  uint32 public minutesReported;

  // making this public breaks Solidity compiler so it starts to output invalid ABI
  string private contractorComment;

  uint256 public hourlyRate;

  uint256 public lastActivityDate = now;
  uint256 public executionDate;
  uint256 public endDate;

  uint256 private contractorCredit = 0;
  uint256 private contractorDebit = 0;

  function Project(
    string _name,
    address _clientAddress,
    uint256 _hourlyRate,
    uint32 _timeCapMinutes,
    uint32 _prepayFractionThousands)
  public {
    require(_prepayFractionThousands <= 1000);
    name = _name;
    clientAddress = _clientAddress;
    hourlyRate = _hourlyRate;
    timeCapMinutes = _timeCapMinutes;
    prepayFractionThousands = _prepayFractionThousands;
    contractorAddress = msg.sender;
  }

  modifier onlyContractor() {
    require(msg.sender == contractorAddress);
    _;
  }

  modifier onlyClient() {
    require(msg.sender == clientAddress);
    _;
  }

  modifier onlyAtState(State _state) {
    require(state == _state);
    _;
  }

  function start() external payable onlyClient onlyAtState(State.Created) {
    // require(this.balance >= (hourlyRate * timeCapMinutes) / 60);
    state = State.Active;
    contractorCredit = getPrepay();
    executionDate = now;
    lastActivityDate = now;
  }

  function getRole() public view returns (Role) {
    if (msg.sender == clientAddress) {
      return Role.Client;
    }
    if (msg.sender == contractorAddress) {
      return Role.Contractor;
    }
    return Role.Stranger;
  }

  function getPrepay() public view returns (uint256) {
    uint256 priceCap = getPriceCap();
    return (priceCap * prepayFractionThousands) / 1000;
  }

  function getPriceCap() public view returns (uint256) {
    return (hourlyRate * timeCapMinutes) / 60;
  }

  function availableForWithdraw() public view returns (uint) {
    if (state == State.Created) {
      return 0;
    }

    Role role = getRole();

    if (role == Role.Stranger) {
      return 0;
    }

    assert(contractorCredit >= contractorDebit);
    uint256 availableToContractor = contractorCredit - contractorDebit;

    if (role == Role.Contractor) {
      return availableToContractor;
    }

    if (role == Role.Client) {
      assert(this.balance >= availableToContractor);
      return this.balance - availableToContractor;
    }

    assert(false);
  }

  function setBillableTime(uint32 timeMinutes, string comment)
    onlyContractor onlyAtState(State.Active)
  external {
    minutesReported = timeMinutes;
    contractorComment = comment;
    lastActivityDate = now;
  }

  function approve() external {
    state = State.Approved;
    endDate = now;
    lastActivityDate = now;

    uint256 approvedPrice = (hourlyRate * minutesReported) / 60;
    if (approvedPrice > contractorCredit) {
      contractorCredit = approvedPrice;
    }
  }

  function cancel() onlyClient onlyAtState(State.Active) external {
    state = State.Cancelled;
    endDate = now;
    lastActivityDate = now;
  }

  function withdraw() public {
    lastActivityDate = now;
    uint256 toBeSent = availableForWithdraw();
    if (toBeSent > 0) {
      if (getRole() == Role.Contractor) {
        contractorDebit = contractorDebit + toBeSent;
      }
      msg.sender.transfer(toBeSent);
    }
  }

  function leaveFeedback(bool positive, string comment) external {
    require(state == State.Approved || state == State.Cancelled);
    // TODO
    lastActivityDate = now;
  }

}
