import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import Message from "../components/Message/Message";

const mapStateToProps = (state) => ({
  isPending: state.requestStatus.isPending,
  error: state.error.error,
});
const mapDispatchToProps = (dispatch) => ({});

const Practice = ({ error, isPending }) => {
  const message = isPending ? "Loading cards..." : error;

  return (
    <>
      <Header text="Practice" />
      {message ? (
        <Message message={message} wrapperClass="decks-error-message" />
      ) : (
        <></>
      )}
      ;
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
