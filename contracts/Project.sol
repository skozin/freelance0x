pragma solidity ^0.4.18;

contract Project {

  string public name;
  uint public value;

  function Project(string _name) public {
    _name = name;
  }

  function setValue(uint newValue) external {
    value = newValue;
  }

}
