import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function ProductList() {
    const [list, setList] = useState([
        { id: uuid(), name: "A1", quantity: "18", price: "5" },
        { id: uuid(), name: "A2", quantity: "20", price: "10" },
        { id: uuid(), name: "B1", quantity: "50", price: "8" }
    ])
    const addItem = (item) => {
        setList((prev) => {
            return [
                ...prev, { ...item, id: uuid() }
            ]
        })
    }
    const deleteItem = (id) => {
        setList((prev) => {
            return prev.filter((item) => (item.id !== id))
        })
    }
    const editItem = (item) => {
        setList((prevs) => {
            return prevs.map((prev) => {
                if (prev.id === item.id) return item;
                return prev;
            })
        })
    }

    return (
        <>
            <ProductForm addItemFunc={addItem} />
            <ProductTable list={list} deleteItemFunc={deleteItem} />
        </>
    );
}