import { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import CallApiTest from './EmployeeServices';
import axios from 'axios';

export default function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([]);
    const [editedEmployee, setEditedEmployee] = useState();

    useEffect(() => {
        search();
    }, [])

    const search = () => {
        CallApiTest()
            .then((response) => {
                console.log(response);
                setEmployeeList(response.data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }

    const addEmployeeFunc =  (newEmployee) => {
         axios.post('http://localhost:8080/api/employees', newEmployee)
            .then((response) => {
                if ((response.status === 201)) {
                    search();
                }
            })
            .catch((error) => {
                console.error('Failed to add data', error);
            })
    }

    const deleteEmployeeFunc = (id) => {
        axios.delete(`http://localhost:8080/api/employees/${id}`)
            .then((response) => {
                if (response.status === 204) {
                    search();
                } else {
                    console.log(`Response from API : ${response.json}`); // Incase response's json sent from API backend doesn't match 201.
                }
            })
            .catch((error) => {
                console.error('Failed to delete the employee', error);
            })
    }

    const editEmployeeFunc = (editedEmp) => {
        console.log(editedEmp);
        try {
            const response = axios.patch(`http://localhost:8080/api/employees/${editedEmp._id}`, editedEmp); //MongoDB automatically create _id not id !!!!
            if (response.status === 200) {
                // If the request is successful, update the employee in the frontend state
                search();
            } else {
                // Handle errors here
                console.error('Failed to update employee');
            }
        } catch (error) {
            // Handle Axios or network errors
            console.error('Error:', error);
        }
    }

    return (
        <>
            <EmployeeForm addEmployeeFunc={addEmployeeFunc} editedEmployee={editedEmployee} editEmployeeFunc={editEmployeeFunc} setEditedEmployee={setEditedEmployee} />
            <EmployeeTable employeeList={employeeList} deleteEmployeeFunc={deleteEmployeeFunc} editEmployeeFunc={setEditedEmployee} />
        </>
    )
}