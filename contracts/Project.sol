pragma solidity ^0.4.18;

contract Project {

  enum State {
    Created,
    Active,
    Approved,
    Cancelled
  }

  string public name;
  State public state;

  address public clientAddress;
  address public contractorAddress;

  uint32 public prepayFractionThousands;
  uint32 public timeCapMinutes;
  uint32 public minutesReported;

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

}
