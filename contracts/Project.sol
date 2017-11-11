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

  uint public hourlyRate;

  uint public executionDate;
  uint public endDate;

  function Project(string _name) public {
    name = _name;
  }

  function start() external {
    state = State.Active;
  }

}
