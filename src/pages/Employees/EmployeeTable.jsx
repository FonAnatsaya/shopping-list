import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';

export default function EmployeeTable({ employeeList, deleteEmployeeFunc, editEmployeeFunc }) {
    return (
        <Table aria-label="basic table">
            <thead>
                <tr>
                    <th style={{ width: '40%' }}>Employee Name</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {employeeList.map((employee) =>
                    <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.position}</td>
                        <td>{employee.salary}</td>
                        <td>
                            <Button variant="outlined" color="primary" style={{ marginRight: "8px" }} onClick={() => editEmployeeFunc(employee)}>Edit</Button>
                            {(employee.position !== "CEO") && <Button variant="outlined" color="primary" onClick={() => deleteEmployeeFunc(employee.id)}>Delete</Button>}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}