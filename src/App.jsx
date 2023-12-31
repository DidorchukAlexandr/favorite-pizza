import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";
import Cart from "./pages/Cart";
import "./scss/app.scss";



function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container"></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
