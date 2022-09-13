
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import MarketPage from "pages/MarketPage";
import ProductDetailPage from "pages/ProductDetailPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/market/:pn/:an" element={<MarketPage></MarketPage>}></Route>
        <Route path="/product/detail/:productid" element={<ProductDetailPage></ProductDetailPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
