import React, { PureComponent } from "react";
import "./Header.css";

class Header extends PureComponent {
  render() {
    return <div className="f2 header">{this.props.text}</div>;
  }
}

export default Header;
