import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <nav className="navBar">
            <div className="nav-container">
                <ul className="nav-links">
                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                isActive ? "active-link" : ""
                            }
                        >
                            Sản phẩm
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/new-product"
                            className={({ isActive }) =>
                                isActive ? "active-link" : ""
                            }
                        >
                            Tạo sản phẩm
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                isActive ? "active-link" : ""
                            }
                        >
                            Tìm kiếm
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
