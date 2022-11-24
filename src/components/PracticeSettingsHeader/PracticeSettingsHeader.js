import React, { PureComponent } from "react";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PracticeSettingsHeader.css";

class PracticeSettingsHeader extends PureComponent {
  render() {
    const { menuExpanded, handleExpandSettingsMenu } = this.props;
    return (
      <div id="practice-settings-header-grid" className="center">
        <div
          id="practice-settings-header-icon-wrapper"
          className="dim"
          onClick={handleExpandSettingsMenu}
        >
          <div id="practice-settings-icon-wrapper">
            {menuExpanded ? (
              <FontAwesomeIcon icon={faCaretDown} />
            ) : (
              <FontAwesomeIcon icon={faCaretRight} />
            )}
          </div>
          <div className="f3 pointer">Settings</div>
        </div>
        <div id="practice-settings-header-balancer-right"></div>
      </div>
    );
  }
}

export default PracticeSettingsHeader;
