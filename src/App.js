import "./App.css";
import FetchData from "./Components/FetchData";
import loadingGif from "./Components/loading-buffering.gif";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const [answer, showAnswer] = useState(false);
  const { data, loading, error, reFetch } = FetchData(
    "https://jservice.io/api/random"
  );

  //  Compare api answer to user answer
  const compareAnswer = () => {
    const { answer } = data;

    if (answer.toUpperCase() === text.toUpperCase()) {
      setAlert(
        <Alert variant="success">
          <Alert.Heading>Answer is Correct</Alert.Heading>
        </Alert>
      );

      setTimeout(() => {
        setAlert("");
      }, 3000);
    } else if (text.trim().length === 0) {
      setAlert(
        <Alert variant="warning">
          <Alert.Heading>Enter valid Answer</Alert.Heading>
        </Alert>
      );

      setTimeout(() => {
        setAlert("");
      }, 3000);
    } else {
      setAlert(
        <Alert variant="danger">
          <Alert.Heading>Answer is Wrong</Alert.Heading>
        </Alert>
      );

      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  // Input change Handler

  const inputChangeHandler = (e) => {
    setText(e.target.value);
  };

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    console.log("Submited");

    compareAnswer();
    setTimeout(() => {
      reFetch();
    }, 1000);
    setText("");
  };

  // Show answer Handler
  const showAnswerHandler = (e) => {
    e.preventDefault();
    showAnswer(!answer);
    setTimeout(() => {
      showAnswer("");
    }, 1000);
  };

  return (
    <div className="App">
      <h1 className="heading">Quiz Game</h1>
      {/* Loading image */}
      {loading && <img src={loadingGif} alt="loading..." />}
      {/* Alerts */}
      <h2>{alert}</h2>
      {/* Get from Api */}
      {answer && <p>{data?.answer}</p>}
      <h1>{data?.question}</h1>
      <textarea
        onChange={inputChangeHandler}
        value={text}
        placeholder="Enter answer"
        required
      ></textarea>{" "}
      <br />
      {/* button for submit */}
      <button className="submit-answer" type="submit" onClick={submitHandler}>
        Submit
      </button>
      <br />
      <br />
      {/* button for show answer */}
      <button className="show-answer" type="Submit" onClick={showAnswerHandler}>
        Show answer
      </button>
      {/* Show error  */}
      {error && (
        <Alert variant="info">
          <Alert.Heading>Something went wrong</Alert.Heading>
        </Alert>
      )}
    </div>
  );
}

export default App;
