import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';

export default function ProductTable({ list, deleteItemFunc, handleSubmitFunc }) {
    return (
        <Table aria-label="basic table">
            <thead>
                <tr>
                    <th style={{ width: '40%' }}>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item) =>
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>
                            <Button variant="outlined" color="primary" onClick={() => handleSubmitFunc(item)}>Edit</Button>
                            <Button variant="outlined" color="primary" onClick={() => deleteItemFunc(item.id)}>Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}