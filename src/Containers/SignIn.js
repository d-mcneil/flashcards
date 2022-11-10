import React, { Component } from "react";
import { connect } from "react-redux";
import { validateSignIn } from "../functions/validateInput";
import { fetchCallSignIn } from "../functions/fetchCalls";
// prettier-ignore
import { onEnterCallback, onFieldChangeResetError } from "../functions/repeatedFunctions";
import { resetError, registrationAndSignInRequest } from "../redux/actions";
import Form from "../components/Forms/Form/Form";
import Title from "../components/Forms/Title/Title";
import EntryBox from "../components/Forms/EntryBox/EntryBox";
import Button from "../components/Forms/Button/Button";
import Message from "../components/Message/Message";

const mapStateToProps = (state) => ({
  error: state.error.error,
  isPending: state.requestStatus.isPending,
});

const mapDispatchToProps = (dispatch) => ({
  signInUser: (currentError, ...args) => {
    dispatch(
      registrationAndSignInRequest(
        validateSignIn,
        fetchCallSignIn,
        "Error signing in user: 0",
        currentError,
        ...args
      )
    );
  },
  resetError: () => dispatch(resetError()),
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    onFieldChangeResetError(this.props);
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
    onFieldChangeResetError(this.props);
  };

  onSubmit = () => {
    this.props.signInUser(this.props.error, ...Object.values(this.state));
  };

  render() {
    const { error, isPending } = this.props;
    const message = isPending ? "Signing in user..." : error;
    return (
      <Form>
        <Title label="Sign In" />
        <EntryBox
          label="Username"
          type="text"
          onChange={this.onUsernameChange}
          onEnterSubmit={(event) => onEnterCallback(event, this.onSubmit)}
        />
        <EntryBox
          label="Password"
          type="password"
          onChange={this.onPasswordChange}
          onEnterSubmit={(event) => onEnterCallback(event, this.onSubmit)}
        />
        <Button
          label="Sign In"
          onClick={this.onSubmit}
          onEnterSubmit={(event) => onEnterCallback(event, this.onSubmit)}
        />
        <Message message={message} wrapperClass="form-error-message" />
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
