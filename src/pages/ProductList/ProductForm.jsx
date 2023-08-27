import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { useState } from 'react';

export default function ProductForm({ addItemFunc }) {
    const [item, setItem] = useState({ name: "", quantity: "", price: "" });
    const [open, setOpen] = React.useState(false);
    const handleChange = (evt) => {
        setItem((prevItem) => (
            { ...prevItem, [evt.target.name]: evt.target.value }
        ))
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        addItemFunc(item);
        setItem({ name: "", quantity: "", price: "" });
        setOpen(false);
    }

    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpen(true)}
            >
                New Product
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{ maxWidth: 500 }}
                >
                    <Typography id="basic-modal-dialog-title" level="h2">
                        Create new Product
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl style={{ marginRight: "10px" }}>
                            <FormLabel>Product Name</FormLabel>
                            <Input placeholder="Product Name" type='text' name='name' value={item.name} onChange={handleChange} />
                        </FormControl>
                        <FormControl style={{ marginRight: "10px" }}>
                            <FormLabel>Quantity</FormLabel>
                            <Input placeholder="Quantity" type='number' name='quantity' value={item.quantity} onChange={handleChange} />
                        </FormControl>
                        <FormControl >
                            <FormLabel>Price</FormLabel>
                            <Input placeholder="Price" type='number' name='price' value={item.price} onChange={handleChange} />
                        </FormControl>
                        <Button style={{ marginTop: "10px" }} type='submit'>Submit</Button>
                        <Button style={{ marginTop: "10px", marginLeft: "12px" }} onClick={() => setOpen(false)}>Close</Button>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    );
}