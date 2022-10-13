import React, { Component } from "react";
import mainUrl from "../mainUrl";
import EntryBox from "../Components/Forms/EntryBox";
import Button from "../Components/Forms/Button";
import Title from "../Components/Forms/Title";
import Error from "../Components/Forms/Error";
import Form from "../Components/Forms/Form";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
    };
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  checkValidInput = (username, password) => {
    if (!username || !password) {
      this.setState({
        error: "Incorrect form submission: all fields are required",
      });
      return false;
    } else if (username.length > 100) {
      this.setState({
        error: "Invalid combination of username and password",
      });
      return false;
    }
    return true;
  };

  onSubmit = () => {
    const { password, username } = this.state;
    const { onRouteChange, loadUser } = this.props;
    const valid = this.checkValidInput(username, password);
    if (!valid) {
      return;
    }
    fetch(`${mainUrl}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id) {
          loadUser(data);
          onRouteChange("home");
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Error logging in user: 0" }));
  };

  onEnterSubmit = (event) => {
    if (event.code === "Enter") {
      this.onSubmit();
    }
  };

  render() {
    const { error } = this.state;
    return (
      <Form>
        <Title label="Sign In" fontSize="f1" />
        <EntryBox
          label="Username"
          onChange={this.onUsernameChange}
          onEnterSubmit={this.onEnterSubmit}
          type="text"
        />
        <EntryBox
          label="Password"
          onChange={this.onPasswordChange}
          onEnterSubmit={this.onEnterSubmit}
          type="password"
        />
        <Button
          label="Sign In"
          onClick={this.onSubmit}
          onEnterSubmit={this.onEnterSubmit}
        />
        <Error error={error} />
      </Form>
    );
  }
}

export default SignIn;
