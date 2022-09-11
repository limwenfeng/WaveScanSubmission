import "./App.css";
import MainPage from "./mainPage/mainPage";
import SuccessPage from "./successPage/successPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/home" element={<MainPage />}></Route>
            <Route path="/success" element={<SuccessPage />}></Route>
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
