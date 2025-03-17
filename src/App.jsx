import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Products";
import Search from "./pages/Search";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                {/* <Route path="/" element={<Navigate to="/products" />} /> */}
                <Route path="/new-product" element={<NewProduct />} />
                <Route path="/products" to element={<Products />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
