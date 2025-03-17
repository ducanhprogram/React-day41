import React, { useState } from "react";
import "./ProductForm.css";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ submitTitle = "Tạo sản phẩm" }) => {
    const navigate = useNavigate();

    const fieldLabels = {
        title: "Tên sản phẩm",
        description: "Mô tả sản phẩm",
        category: "Danh mục",
        price: "Giá ($)",
        discountPercentage: "Giảm giá (%)",
        rating: "Đánh giá (0-5)",
        stock: "Tồn kho",
        tags: "Tags (cách nhau bằng dấu phẩy)",
        brand: "Thương hiệu",
        sku: "Mã SKU",
        weight: "Trọng lượng (kg)",
        minimumOrderQuantity: "Số lượng tối thiểu",
        thumbnail: "URL hình ảnh",
    };

    // console.log(Object.keys(fieldLabels));
    const [formData, setFormData] = useState(
        Object.keys(fieldLabels).reduce((prevValue, key) => {
            // console.log({ ...prevValue });
            // console.log(prevValue, key);
            return { ...prevValue, [key]: "" };
        }, {})
    );
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await fetch(
                `https://api01.f8team.dev/api/products`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        price: parseFloat(formData.price),
                        discountPercentage: parseFloat(
                            formData.discountPercentage
                        ),
                        rating: parseFloat(formData.rating),
                        stock: parseInt(formData.stock),
                        weight: parseFloat(formData.weight),
                        minimumOrderQuantity: parseInt(
                            formData.minimumOrderQuantity
                        ),
                        tags: formData.tags.split(","),
                    }),
                }
            );

            const data = await response.json();

            console.log(data);
            if (!response.ok) {
                setErrors(data.ok || {});
                return;
            }

            alert("Tạo sản phẩm thành công!!!");
            navigate("/products");
        } catch (e) {
            console.error("Lỗi khi gửi dữ liệu: ", e);
        }
    };

    return (
        <div className="product-form-container">
            <form className="product-form" onSubmit={handleSubmit}>
                {Object.keys(fieldLabels).map((field) => {
                    return (
                        <div className="form-group" key={field}>
                            <label htmlFor={field}>{fieldLabels[field]}</label>
                            <input
                                type={
                                    [
                                        "price",
                                        "discountPercentage",
                                        "rating",
                                        "stock",
                                        "weight",
                                        "minimumOrderQuantity",
                                    ].includes(field)
                                        ? "number"
                                        : "text"
                                }
                                id={field}
                                name={field}
                                className="form-input"
                                placeholder={fieldLabels[field]}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />

                            {errors[field] && (
                                <p className="error-message">{errors[field]}</p>
                            )}
                        </div>
                    );
                })}

                <button type="submit" className="submit-button">
                    {submitTitle}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
