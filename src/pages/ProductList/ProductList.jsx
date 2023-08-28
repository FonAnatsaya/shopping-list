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
    const [editedItem, setEditedItem] = useState(null);

    const addItemFunc = (item) => {
        setList((prev) => {
            return [
                ...prev, { ...item, id: uuid() }
            ]
        })
    }
    const deleteItemFunc = (id) => {
        setList((prev) => {
            return prev.filter((item) => (item.id !== id))
        })
    }
    const editItemFunc = (item) => {
        setList((prevs) => {
            return prevs.map((prev) => {
                if (prev.id === item.id) return item;
                return prev;
            })
        })
    }

    const handleSubmit = (item) => {
        setEditedItem(item);
    }

    return (
        <>
            <ProductForm addItemFunc={addItemFunc} editItemFunc={editItemFunc} editedItem={editedItem} setEditedItem={setEditedItem} />
            <ProductTable list={list} deleteItemFunc={deleteItemFunc} handleSubmit={handleSubmit} />
        </>
    );
}