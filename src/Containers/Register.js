import React, { Component } from "react";
import EntryBox from "../Components/Forms/EntryBox";
import Button from "../Components/Forms/Button";
import Title from "../Components/Forms/Title";
import Error from "../Components/Forms/Error";
import Form from "../Components/Forms/Form";
import mainUrl from "../mainUrl";

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

  checkValidInput = (firstName, lastName, email, username, password) => {
    if (!firstName || !lastName || !email || !username || !password) {
      this.setState({
        error: "Incorrect form submission: all fields are required",
      });
      return false;
    } else if (firstName.length > 100) {
      this.setState({
        error:
          "Invalid form submission: first name must be no more than 100 characters long",
      });
      return false;
    } else if (lastName.length > 100) {
      this.setState({
        error:
          "Invalid form submission: last name must be no more than 100 characters long",
      });
      return false;
    } else if (email.length > 100) {
      this.setState({
        error:
          "Invalid form submission: email must be no more than 100 characters long",
      });
      return false;
    } else if (username.length > 100) {
      this.setState({
        error:
          "Invalid form submission: username must be no more than 100 characters long",
      });
      return false;
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.setState({ error: "Incorrect form submission: invalid email" });
      return false;
    }
    return true;
  };

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
    const valid = this.checkValidInput(
      firstName,
      lastName,
      email,
      username,
      password
    );
    if (!valid) {
      return;
    }
    fetch(`${mainUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, username, password }),
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
