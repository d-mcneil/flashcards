import React, { Component } from "react";
import "./ToggleSwitch.css";

class ToggleSwitch extends Component {
  render() {
    const {
      labelLeft = "",
      labelRight,
      value,
      checked,
      onChange,
      onAndOff = false,
    } = this.props;

    const onAndOffString = onAndOff ? "on-and-off" : "";

    return (
      <div className="toggle-switch-grid-wrapper center">
        {labelLeft ? (
          <span className="f6 f5-ns label-left">{labelLeft}</span>
        ) : (
          <></>
        )}

        <label className="switch">
          <input
            type="checkbox"
            value={value}
            checked={checked}
            onChange={onChange}
          ></input>
          <span className={`slider round ${onAndOffString}`}></span>
        </label>

        <span className="f6 f5-ns label-right">{labelRight}</span>
      </div>
    );
  }
}

export default ToggleSwitch;
