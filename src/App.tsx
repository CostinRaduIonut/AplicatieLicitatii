import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import Product from "./pages/product/Product";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Upload from "./pages/product/UploadProduct";
import Test from "./pages/test/Test";
import MyProducts from "./pages/product/MyProducts";
import EditProduct from "./pages/product/EditProduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/MyProducts" element={<MyProducts />} />
        <Route path="/EditProduct/:id" element={< EditProduct/>} />
        <Route path="/Test" element={<Test/>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
