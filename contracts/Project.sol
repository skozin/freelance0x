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

  uint256 public executionDate;
  uint256 public endDate;

  function Project(
    string _name,
    address _clientAddress,
    uint256 _hourlyRate,
    uint32 _timeCapMinutes,
    uint32 _prepayFractionThousands)
  public {
    name = _name;
    clientAddress = _clientAddress;
    hourlyRate = _hourlyRate;
    timeCapMinutes = _timeCapMinutes;
    prepayFractionThousands = _prepayFractionThousands;
    contractorAddress = msg.sender;
  }

  function start() external {
    state = State.Active;
    executionDate = now;
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

  function setBillableTime(uint32 timeMinutes, string comment) external {
    minutesReported = timeMinutes;
    contractorComment = comment;
  }

  function approve() external {
    state = State.Approved;
    endDate = now;
  }

  function cancel() external {
    state = State.Cancelled;
    endDate = now;
  }

  function withdraw() external {
    if (this.balance > 0) {
      msg.sender.transfer(this.balance);
    }
  }

  function leaveFeedback(bool positive, string comment) external {
    // TODO
  }

}
