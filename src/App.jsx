import { useState } from "react";

import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";

function App() {
  //lifting this state up(from userInput to App) since we want to use the userInput in results component
  //getting and storing the value that we get from the user from inputs
  const [userInput, setUserInput] = useState({
    //an object with initial state
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = userInput.duration >= 1;

  //should be triggered whenever we change the value in the input fields and update the state
  function handleChange(inputIdentifier, newValue) {
    setUserInput(
      //the updated state must depend on the old state-we use the function form
      (prevUserInput) => {
        return {
          ...prevUserInput, //getting the initial state, spreading the old prevuserinput into (prevuserinput)
          [inputIdentifier]: +newValue, //setting the property (that we get as a string in inputIdentifier) to the new value that were getting
        };
      }
    );
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {
        //result component should only be outputted when having valid user input
        !inputIsValid && (
          <p className="center">Please enter a duration greater than zero.</p>
        )
      }
      {inputIsValid && <Results input={userInput} />}
    </>
  );
}

export default App;
