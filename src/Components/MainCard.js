import React from "react";

const MainCard = ({ children }) => {
  return (
    <>
      <div className="br3 ba b--black-10 mv4 w-100 mw6 shadow-5 center width-30-em-after-break">
        <main className="pa4 black-80">
          <div className="measure center">{children}</div>
        </main>
      </div>
    </>
  );
};

export default MainCard;
