import React from "react";
import MainCard from "../MainCard";

const Form = ({ children }) => {
  return (
    <>
      {/* <div className="br3 ba b--black-10 mt4 w-100 mw6 shadow-5 center sign-in-form">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset className="ba b--transparent ph0 mh0">
              {children.slice(0, -2)}
            </fieldset>
            {children.slice(-2)}
          </div>
        </main>
      </div> */}
      <MainCard>
        <fieldset className="ba b--transparent ph0 mh0">
          {/* the input boxes for the register and sign-in forms */}
          {children.slice(0, -2)}
        </fieldset>
        {/* the submit button and error message for the register and sign-in forms */}
        {children.slice(-2)}
      </MainCard>
    </>
  );
};

export default Form;
