import { useEffect, useState } from "react";
import "./ProductList.css";

function ProductList() {
    const params = new URLSearchParams(location.search);

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(+params.get("page") || 1);
    const [perPage, setPerPage] = useState(+params.get("per_page") || 10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await fetch(
                `https://api01.f8team.dev/api/products?page=${currentPage}&per_page=${perPage}`
            );
            const res = await response.json();
            setProducts(res.data);

            const pages = res.to ? Math.ceil(res.total / perPage) : 1;

            setTotalPages(pages);

            history.replaceState(
                null,
                null,
                `?page=${currentPage}&per_page=${perPage}`
            );
        };
        fetchAPI();
    }, [currentPage, perPage]);
    return (
        <div className="product-list-container">
            <ul className="product-list">
                {products.map((product) => {
                    return (
                        <li key={product.id} className="product-item">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="product-image"
                            />
                            <div className="product-info">
                                <h3 className="product-title">
                                    {product.title}
                                </h3>
                                <p className="product-price">{product.price}</p>
                                <p className="product-stock">
                                    Còn {product.stock} sản phẩm
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className="pagination-container">
                <div className="items-per-page">
                    <label htmlFor="itemsPerPage">Hiển thị:</label>
                    <select
                        value={perPage}
                        id="itemsPerPage"
                        className="items-select"
                        onChange={(e) => {
                            setPerPage(+e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <div className="pagination">
                    <button
                        className="page-button"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        ⬅ Trước
                    </button>

                    <div className="page-numbers">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    className={`page-number ${
                                        currentPage === pageNumber
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        className="page-button"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Tiếp ➡
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
