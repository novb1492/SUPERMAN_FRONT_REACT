
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import MarketPage from "pages/MarketPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/market/:pn/:an" element={<MarketPage></MarketPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
