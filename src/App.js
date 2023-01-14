import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import Product from "./product/Product";
import Upload from "./product/UploadProduct";
import EditProduct from "./product/EditProduct";
import MyProducts from "./product/MyProducts";
import Istoric from "./product/Istoric";
function App() {
  return(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/MyProducts" element={<MyProducts />} />
        <Route path="/EditProduct/:id" element={< EditProduct/>} />
        <Route path="/Istoric/:id" element={<Istoric />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
