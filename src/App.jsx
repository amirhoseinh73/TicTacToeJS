import ReactDOM from "react-dom";
import Main from "./components/Main.jsx";
import "./style.css";

const App = () => {
  return (
    <div>
      <h1 className="main-title">Tic Toc Toe!</h1>
      <Main />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
