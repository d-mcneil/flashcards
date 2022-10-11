import React from "react";

const Form = ({ children }) => {
  return (
    <>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              {children.slice(0, -2)}
            </fieldset>
            {children.slice(-2)}
          </div>
        </main>
      </article>
    </>
  );
};

export default Form;
