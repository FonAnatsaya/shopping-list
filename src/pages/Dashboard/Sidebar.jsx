import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="Sidebar">
            <ul>
                <li>
                    <Link to="/product-list">Product List</Link>
                </li>
                <li>
                    <Link to="/employee-list">Employees Information</Link>
                </li>
            </ul>
        </div>
    );
}