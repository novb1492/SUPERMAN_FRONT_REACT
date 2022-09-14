
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import MarketPage from "pages/MarketPage";
import ProductDetailPage from "pages/ProductDetailPage";
import CartPage from "pages/CartPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/market/:pn/:an" element={<MarketPage></MarketPage>}></Route>
        <Route path="/product/detail/:productid" element={<ProductDetailPage></ProductDetailPage>}></Route>
        <Route path="/cart/list" element={<CartPage></CartPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
