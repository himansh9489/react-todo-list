import React from "react";
import logo from "../assets/images/todo_logo.png";
const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src={logo} alt="todo list" />
        </div>
        <div> Todo List</div>
      </nav>
    </header>
  );
};

export default Header;
