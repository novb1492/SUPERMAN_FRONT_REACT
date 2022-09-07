
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
