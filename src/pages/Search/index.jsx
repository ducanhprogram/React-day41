import React, { useState } from "react";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import "./Search.css";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [searchTerm, setSearchTerm] = useState(params.get("q") || "");

    const handleSearch = () => {
        if (searchTerm.trim()) {
            params.set("q", searchTerm); // Thêm từ khóa vào URL
        } else {
            params.delete("q"); // Xóa `q` nếu ô tìm kiếm trống
        }
        params.set("page", 1); // Reset về trang đầu tiên
        navigate(`/search?${params.toString()}`); // Cập nhật URL
    };
    return (
        <div className="page-container">
            <h1 className="search-title">Tìm kiếm sản phẩm</h1>

            <div className="search-bar">
                <input
                    value={searchTerm}
                    type="text"
                    className="search-input"
                    placeholder="Nhập tên sản phẩm..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                    Tìm kiếm
                </button>
            </div>

            <ProductList />

            {/* Loading nhé */}
            {/* <Loading /> */}

            {/* Message hiển thị khi không tìm thấy nhé AE */}
            <p className="empty-message">Không tìm thấy sản phẩm nào.</p>
        </div>
    );
};

export default Search;
