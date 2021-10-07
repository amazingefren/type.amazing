import React from "react";

/* Path Testing */
import Test from "@components/TspathTest";
import Test2 from "components/TspathTest";
import Test3 from "@test";

const App: React.FC = () => {
  return (
    <div>
      <Test />
      <Test2 />
      <Test3 />
      Hello World!
    </div>
  );
};

export default App;
