import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function ProductList() {

    const [list, SetList] = useState([
        { id: uuid(), name: "A1", quantity: "18", price: "5" },
        { id: uuid(), name: "A2", quantity: "20", price: "10" },
        { id: uuid(), name: "B", quantity: "50", price: "8" }
    ]);
    return (
        <>
            <ProductForm />
            <ProductTable list={list} />
        </>
    );
}