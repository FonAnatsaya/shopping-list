import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { CallApiTest2 } from "./ProductService";
import axios from 'axios';

export default function ProductList() {
    const [list, setList] = useState([]);
    const [editedItem, setEditedItem] = useState(null);

    useEffect(() => {
        search();
    }, [])

    const search = () => {
        CallApiTest2()
            .then((response) => {
                setList(response.data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }

    const addItemFunc = async (item) => {
        await axios.post('http://localhost:8080/api/product', item)
            .then((response) => {
                if (response.status === 201) {
                    search();
                } else {
                    console.log(`Response status found is ${response.status}`);
                }
            })
            .catch((error) => {
                console.error('Found error', error);
            })
    }

    const deleteItemFunc = async (id) => {
        await axios.delete(`http://localhost:8080/api/product/${id}`)
            .then((response) => {
                if (response.status === 204) {
                    search();
                } else {
                    console.log(`Response status found is ${response.status}`);
                }
            })
            .catch((error) => {
                console.error('Found error', error);
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

    const handleSubmitFunc = (item) => {
        setEditedItem(item);
    }

    return (
        <>
            <ProductForm addItemFunc={addItemFunc} editItemFunc={editItemFunc} editedItem={editedItem} setEditedItem={setEditedItem} />
            <ProductTable list={list} deleteItemFunc={deleteItemFunc} handleSubmitFunc={handleSubmitFunc} />
        </>
    );
}