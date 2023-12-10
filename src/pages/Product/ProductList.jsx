import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import * as React from 'react';
import { useState, useEffect } from 'react';
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

    const addItemFunc = (item) => {
         axios.post('http://localhost:8080/api/product', item)
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

    const deleteItemFunc = (id) => {
         axios.delete(`http://localhost:8080/api/product/${id}`)
            .then((response) => {
                if (response.status === 204) {
                    search();
                } else {
                    console.log(`Response status found is ${response.status}`);
                }
            })
            .catch((error) => {
                console.error('Found error: ', error);
            })
    }

    const editItemFunc = (item) => {
        axios.patch(`http://localhost:8080/api/product/${item._id}`, item)
            .then((response) => {
                if (response.status === 200) {
                    search();
                } else {
                    console.log(`Response status found is ${response.status}`);
                }
            })
            .catch((error) => {
                console.error('Found error: ', error);
            })
    }

    return (
        <>
            <ProductForm addItemFunc={addItemFunc} editItemFunc={editItemFunc} editedItem={editedItem} setEditedItem={setEditedItem} />
            <ProductTable list={list} deleteItemFunc={deleteItemFunc} setEditedItem={setEditedItem} />
        </>
    );
}