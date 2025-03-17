import React from "react";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";

const Products = () => {

    
    return (
        <div className="page-container">
            <h1 className="page-title">Danh Sách Sản Phẩm</h1>
            <ProductList />

            {/* Loading nhé */}
            {/* <Loading /> */}


            {/* Message hiển thị khi danh sách trống nhé AE */}
            <p className="empty-message">Không có sản phẩm nào.</p>
        </div>
    );
};

export default Products;
