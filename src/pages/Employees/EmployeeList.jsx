import { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import { CallApiTest } from './EmployeeServices';
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
                setEmployeeList(response.data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }

    const addEmployeeFunc = async (newEmployee) => {
        await axios.post('http://localhost:8080/api/employees', newEmployee)
            .then((response) => {
                console.log(response);
                if ((response.status === 201)) {
                    search();
                } else {
                    console.log(`Response from API : ${response.json}`); // Incase response's json sent from API backend doesn't match 201.
                }
            })
            .catch((error) => {
                console.error('Failed to add data', error);
            })
    }

    const deleteEmployeeFunc = async (id) => {
        await axios.delete(`http://localhost:8080/api/employees/${id}`)
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

    const editEmployeeFunc = async (editedEmp) => {
        try {
            const response = await axios.patch(`http://localhost:8080/api/employees/${editedEmp.id}`, editedEmp);
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