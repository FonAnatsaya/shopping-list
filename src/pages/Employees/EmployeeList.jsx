import { useState } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import { v4 as uuid } from 'uuid';

export default function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([
        { id: uuid(), name: "Johnny", position: "Junior Developer", salary: "25,000" },
        { id: uuid(), name: "Linda", position: "IT Support", salary: "30,000" },
        { id: uuid(), name: "Stephen", position: "Data Analyst", salary: "38,000" },
        { id: uuid(), name: "Rainny", position: "CEO", salary: "500,000" }
    ])
    const [editedEmployee, setEditedEmployee] = useState(null);

    const addEmployeeFunc = (newEmployee) => {
        setEmployeeList((prev) => ([...prev, { ...newEmployee, id: uuid() }]));
    }
    const deleteEmployeeFunc = (id) => {
        setEmployeeList((prevs) => (prevs.filter((prev) => prev.id !== id)));
    }
    const editEmployeeFunc = (editedEmp) => {
        setEmployeeList((prevs) => {
            return prevs.map((prev) => {
                if (prev.id === editedEmp.id) return editedEmp;
                else {
                    return prev;
                }
            })
        })
    }

    const setEditEmployeeFunc = (editedEmployee) => {
        setEditedEmployee(editedEmployee);
    }

    return (
        <>
            <EmployeeForm addEmployeeFunc={addEmployeeFunc} editedEmployee={editedEmployee} editEmployeeFunc={editEmployeeFunc} setEditedEmployee={setEditedEmployee} />
            <EmployeeTable employeeList={employeeList} deleteEmployeeFunc={deleteEmployeeFunc} editEmployeeFunc={setEditEmployeeFunc} />
        </>
    )
}