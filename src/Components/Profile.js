import React, { Component } from "react";
import MainCard from "./MainCard";
import mainUrl from "../mainUrl";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  onDeleteUser = () => {
    const { username, userId } = this.props.user;
    const { onRouteChange } = this.props;
    fetch(`${mainUrl}/delete-user`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === userId) {
          onRouteChange("signed-out");
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Error deleting user: 1" }));
  };

  render() {
    const { error } = this.state;
    const { user } = this.props;
    return (
      <MainCard>
        <div className="f3 tc">{`First Name: ${user.firstName}`}</div>
        <div className="f3 mt3 tc">{`Last Name: ${user.lastName}`}</div>
        <div className="f3 mt3 tc">{`Username: ${user.username}`}</div>
        <div className="f3 mt3 tc">{`Email: ${user.email}`}</div>
        <div className="f3 mt3 tc">{`Joined: ${user.joined
          .replace("T", " ")
          .replace("Z", " UTC")}`}</div>
        <p
          className="f3 link black underline mt5 mh3 mb2 dim pointer tc"
          onClick={() => this.onDeleteUser(user.username)}
        >
          Delete User
        </p>
        <p className="f3 link black mt0 pt0 mh3 tc">
          CAUTION: IF YOUR CLICK THIS, IT CAN'T BE UNDONE
        </p>
        {error ? (
          <div className="lh-copy mt3">
            <p className="b mb0 f6 pt2 link black db">{error}</p>
          </div>
        ) : (
          <></>
        )}
      </MainCard>
    );
  }
}

export default Profile;
