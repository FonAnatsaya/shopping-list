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
        // try {
        //     const response = await axios.post('http://localhost:8080/api/employees', newEmployee);
        //     if (response.status === 201) {
        //         // If the request is successful, show the updated data by calling 
        //         search();
        //     } else {
        //         // Handle errors here
        //         console.error('Failed to add employee');
        //     }
        // } catch (error) {
        //     // Handle Axios or network errors
        //     console.error('Error:', error);
        // }

        await axios.post('http://localhost:8080/api/employees', newEmployee)
            .then((response) => {
                if ((response.status === 201) && (response.json === { message: 'Employee added successfully' })) {
                    search();
                } else {
                    console.log(`Response from API : ${response}`); // In case response from 
                }
            })
            .catch((error) => {
                console.error('Failed to add data', error);
            })
    }

    const deleteEmployeeFunc = (id) => {
        setEmployeeList((prevs) => (prevs.filter((prev) => prev.id !== id)));
    }

    const editEmployeeFunc = async (editedEmp) => {
        try {
            const response = await axios.patch(`http://localhost:8080/api/employees/${editedEmp.id}`, editedEmp);
            if (response.status === 200) {
                // If the request is successful, update the employee in the frontend state
                setEmployeeList((prevs) => {
                    return prevs.map((prev) => {
                        if (prev.id === editedEmp.id) return editedEmp;
                        else {
                            return prev;
                        }
                    });
                });
                console.log('Employee updated successfully');
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