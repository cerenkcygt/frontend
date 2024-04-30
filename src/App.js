import axiosInstance from "./api/axiosInstance";
import Navbar from "./components/Navbar";
import ProductLists from "./components/ProductLists";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Womans from "./pages/Womans";
import Man from "./pages/Man";
import Children from "./pages/Children";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Accessory from "./pages/Accessory";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/product").then((res) => {
      setProducts(res.data);
    });
  }
  , []);

  return (
    <div className="flex flex-col w-full ">
      <Router>
        <Navbar />
       <div className="flex flex-col lg:mx-20 pt-10">
        <Routes>
          <Route path="/" element={<ProductLists products={products.products ?? []} />} />
          <Route path="/contact" element={<h1 className="text-2xl">Contact</h1>} />
          <Route path="/kadin" element={<Womans />} />
          <Route path="/erkek" element={<Man />} />
          <Route path="/cocuk" element={<Children />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:id" element={<Details/>} />
          <Route path="/accessory" element={<Accessory />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
