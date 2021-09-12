import React from "react";

const RequiredFields: React.FC = () => {
  return (
    <>
      <section>
        <h3>
          What is your basic goal?<span>*</span>
        </h3>
        <div>
          <div>
            <h4>Lose Fat</h4>
          </div>
          <div>
            <h4>Gain Muscle</h4>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequiredFields;
