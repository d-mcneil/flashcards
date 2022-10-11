import React, { Component } from "react";
import EntryBox from "./EntryBox";
import Button from "./Button";
import Title from "./Title";
import Error from "./Error";
import Form from "./Form";
import mainUrl from "../../mainUrl";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      error: "",
    };
  }

  onFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
  };

  onLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = () => {
    const { onRouteChange, loadUser } = this.props;
    const { password, email, firstName, lastName, username } = this.state;
    fetch(`${mainUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
      }),
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
      .catch((err) =>
        this.setState({ error: "Unable to register new user: 0" })
      );
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
        <Title label="Register" fontSize="f1" />
        <EntryBox
          label="First Name"
          onChange={this.onFirstNameChange}
          onEnterSubmit={this.onEnterSubmit}
          type="text"
        />
        <EntryBox
          label="Last Name"
          onChange={this.onLastNameChange}
          onEnterSubmit={this.onEnterSubmit}
          type="text"
        />
        <EntryBox
          label="Email"
          onChange={this.onEmailChange}
          onEnterSubmit={this.onEnterSubmit}
          type="email"
        />
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
          label="Register"
          onClick={this.onSubmit}
          onEnterSubmit={this.onEnterSubmit}
        />
        <Error error={error} />
      </Form>
    );
  }
}

export default Register;
