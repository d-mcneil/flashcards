import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUser } from "../redux/actions";
import { validateSignIn } from "../functions/validateInput";
import { fetchCallSignIn } from "../functions/fetchCalls";
import { onEnterSubmit } from "../functions/repeatedFunctions";
import Form from "../components/Forms/Form/Form";
import Title from "../components/Forms/Title/Title";
import EntryBox from "../components/Forms/EntryBox/EntryBox";
import Button from "../components/Forms/Button/Button";
import Message from "../components/Message/Message";

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (user) => dispatch(loadUser(user)),
});

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
    const { username, password } = this.state;
    const { onSignIn } = this.props;

    const validity = validateSignIn(username, password);
    // returns object with properties { valid, reason(only if invalid) }

    if (!validity.valid) {
      this.setState({ error: validity.reason });
      return;
    }

    fetchCallSignIn(username, password)
      .then((data) => {
        if (data.userId) {
          onSignIn(data);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Error signing in user: 0" }));
  };

  render() {
    const { error } = this.state;
    return (
      <Form>
        <Title label="Sign In" />
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
          label="Sign In"
          onClick={this.onSubmit}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <Message message={error} wrapperClass="form-error-message" />
      </Form>
    );
  }
}

export default connect(null, mapDispatchToProps)(SignIn);
