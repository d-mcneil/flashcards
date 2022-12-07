import React, { useEffect } from "react";
import { connect, batch } from "react-redux";
// prettier-ignore
import { deleteUserRequest, requestResovled, unloadCurrentDeck, signOutUser } from "../../redux/actions";
import Message from "../Message/Message";
import Header from "../Header/Header";
import "./Profile.css";

const mapStateToProps = (state) => ({
  error: state.error.error,
  user: state.userStatus.user,
  isPending: state.requestStatus.isPending,
  sampleUser: state.userStatus.sampleUser,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (userId, username, error) =>
    dispatch(deleteUserRequest(userId, username, error)),
  onDeleteSampleUser: (error) => dispatch(signOutUser(error)),
  cleanUpStateOnMount: () =>
    batch(() => {
      dispatch(unloadCurrentDeck());
      // this is done because navigation from the Profile component goes to the Decks component,
      // which implies that a deck has not been selected

      dispatch(requestResovled());
      // this is done so that, if there is a previous request that's unresolved,
      // the user doesn't get a "Deleting user..." message upon navigating to Profile
    }),
});

// prettier-ignore
const Profile = ({ error, user, isPending, deleteUser, cleanUpStateOnMount, sampleUser, onDeleteSampleUser }) => {
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanUpStateOnMount(), []);

  const message = isPending ? "Deleting user..." : error;
  const { userId, firstName, lastName, email, username, joined } = user;
  const profileStyleClasses = "f3 profile-field";

  const handleDeleteUser = () => {
    if (sampleUser) {
      onDeleteSampleUser(error)
    } else {
      deleteUser(userId, username, error)
    }
  }

  return (
    <>
      <Header text="Profile" />
      <div className={profileStyleClasses}><strong>First Name</strong>: {`${firstName}`}</div>
      <div className={profileStyleClasses}><strong>Last Name</strong>: {`${lastName}`}</div>
      <div className={profileStyleClasses}><strong>Username</strong>: {`${username}`}</div>
      <div className={profileStyleClasses}><strong>Email</strong>: {`${email}`}</div>
      <div className={profileStyleClasses}><strong>Joined</strong>: {`${joined
        .replace("T", " ")
        .replace("Z", " UTC")}`}</div>
      <p
        className="f3 dim profile-delete-button"
        onClick={handleDeleteUser}
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
