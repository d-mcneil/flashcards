import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteUserRequest, requestResovled } from "../../redux/actions";
import "./Profile.css";
import Message from "../Message/Message";
import Header from "../Header/Header";

const mapStateToProps = (state) => ({
  error: state.error.error,
  user: state.userStatus.user,
  isPending: state.requestStatus.isPending,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (userId, username, error) =>
    dispatch(deleteUserRequest(userId, username, error)),
  showResolvedPreviousRequest: () => dispatch(requestResovled()),
});

const Profile = ({
  error,
  user,
  isPending,
  deleteUser,
  showResolvedPreviousRequest,
}) => {
  useEffect(() => {
    // this is done so that, if there is a previous request that's unresolved,
    //  the user doesn't get a "Deleting user..." message upon navigating to Profile
    if (isPending) {
      showResolvedPreviousRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const message = isPending ? "Deleting user..." : error;
  const { userId, firstName, lastName, email, username, joined } = user;
  const profileStyleClasses = "f3 profile-field";

  return (
    <>
      <Header text="Profile" />
      <div className={profileStyleClasses}>{`First Name: ${firstName}`}</div>
      <div className={profileStyleClasses}>{`Last Name: ${lastName}`}</div>
      <div className={profileStyleClasses}>{`Username: ${username}`}</div>
      <div className={profileStyleClasses}>{`Email: ${email}`}</div>
      <div className={profileStyleClasses}>{`Joined: ${joined
        .replace("T", " ")
        .replace("Z", " UTC")}`}</div>
      <p
        className="f3 dim profile-delete-button"
        onClick={() => deleteUser(userId, username, error)}
      >
        Delete User
      </p>
      <p className="f3 profile-delete-warning">
        CAUTION: IF YOUR CLICK THIS, IT CAN'T BE UNDONE
      </p>
      {message ? (
        <Message message={message} wrapperClass="profile-error-message" />
      ) : (
        <></>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
