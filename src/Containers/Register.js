import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions";
import { validateRegistration } from "../functions/validateInput";
import { fetchCallRegister } from "../functions/fetchCalls";
import { onEnterSubmit } from "../functions/repeatedFunctions";
import Form from "../components/Forms/Form/Form";
import Title from "../components/Forms/Title/Title";
import EntryBox from "../components/Forms/EntryBox/EntryBox";
import Button from "../components/Forms/Button/Button";
import Message from "../components/Message/Message";

const mapDispatchToProps = (dispatch) => ({
  onRegisterUser: (user) => dispatch(loginUser(user, "home")),
  // an alternative way of grouping the actions "loadUser" and "routeChange" together
  // import { batch } from "react-redux";
  // import { loadUser, routeChange } from "../redux/actions";
  // onRegisterUser: (user) =>
  //   batch(() => {
  //     dispatch(loadUser(user));
  //     dispatch(routeChange("home"));
  //   }),
});

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
    this.resetError();
  };

  onLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
    this.resetError();
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
    this.resetError();
  };

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    this.resetError();
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
    this.resetError();
  };

  resetError = () => {
    if (this.state.error) {
      this.setState({ error: "" });
    }
  };

  onSubmit = () => {
    const { firstName, lastName, email, username, password } = this.state;
    const { onRegisterUser } = this.props;

    // prettier-ignore
    const validity = validateRegistration(firstName, lastName, email, username, password);
    // returns object with properties { valid, reason(only if invalid) }

    if (!validity.valid) {
      this.setState({ error: validity.reason });
      return;
    }

    fetchCallRegister(firstName, lastName, email, username, password)
      .then((data) => {
        if (data.userId) {
          onRegisterUser(data);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) =>
        this.setState({ error: "Error registering new user: 0" })
      );
  };

  render() {
    const { error } = this.state;
    return (
      <Form>
        <Title label="Register" />
        <EntryBox
          label="First Name"
          onChange={this.onFirstNameChange}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
          type="text"
        />
        <EntryBox
          label="Last Name"
          type="text"
          onChange={this.onLastNameChange}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <EntryBox
          label="Email"
          type="email"
          onChange={this.onEmailChange}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <EntryBox
          label="Username"
          type="text"
          onChange={this.onUsernameChange}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <EntryBox
          label="Password"
          type="password"
          onChange={this.onPasswordChange}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <Button
          label="Register"
          onClick={this.onSubmit}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <Message message={error} wrapperClass="form-error-message" />
      </Form>
    );
  }
}

export default connect(null, mapDispatchToProps)(Register);
