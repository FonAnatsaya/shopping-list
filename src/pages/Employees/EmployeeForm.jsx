import { useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Select from "@mui/joy/Select";
import Option from '@mui/joy/Option';
import FormHelperText from '@mui/joy/FormHelperText';

export default function EmployeeForm({ addEmployeeFunc, editedEmployee, editEmployeeFunc, setEditedEmployee }) {
    const [form, setForm] = useState({ name: "", position: "", salary: "" });
    const [open, setOpen] = useState(false);
    const [warningCEO, setWarningCEO] = useState(false);
    const [warningBlank, setWarningBlank] = useState(false);

    useEffect(() => {
        if (editedEmployee) {
            setForm(editedEmployee);
            setOpen(true);
        }
    }, [editedEmployee])

    useEffect(() => {
        if (form.position === "CEO") setWarningCEO(true);
        else {
            setWarningCEO(false);
        }
    }
        , [form.position])

    useEffect(() => {
        if (form) setWarningBlank(false);
    }, [form])

    const handleChange = (evt) => {
        setForm((prev) => ({ ...prev, [evt?.target.name]: evt?.target.value }))
    }
    const handleChangeSelect = (newValue, field) => {
        setForm((prev) => ({ ...prev, [field]: newValue }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { name, position, salary } = form;
        console.log("name = " + name, "position = " + position, "salary = " + salary);
        if (!name || !position || !salary) {
            setWarningBlank(true);
            return;
        }
        if (position === "CEO") {
            return;
        }
        if (editedEmployee) {
            setEditedEmployee(null);
            editEmployeeFunc(form);
        } else {
            addEmployeeFunc(form);
        }
        setForm({ name: "", position: "", salary: "" });
        setOpen(false);
    }

    const handleCloseButton = () => {
        setOpen(false);
        setForm({ name: "", position: "", salary: "" });
        setEditedEmployee(null);
    }
    const submitButtonText = editedEmployee ? "Edit Submit" : "Submit";
    const inputRef = React.useRef(null);
    return (
        <>
            <Button
                variant="outlined"
                color="neutral"
                onClick={() => setOpen(true)}
            >
                New Employee
            </Button>
            <Modal open={open} onClose={handleCloseButton}>
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{ maxWidth: 500 }}
                >
                    <Typography id="basic-modal-dialog-title" level="h2">
                        Employee Information
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" placeholder="name" onChange={(evt) => handleChange(evt)} name="name" value={form.name} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Position</FormLabel>
                            <Select placeholder="position" onChange={(_, newValue) => handleChangeSelect(newValue, 'position')} value={form.position}>
                                <Option value="CEO">CEO</Option >
                                <Option value="Junior Developer">Junior Developer</Option >
                                <Option value="IT Support">IT Support</Option >
                                <Option value="Data Analyst">Data Analyst</Option >
                            </Select>
                            {warningCEO && <h4 style={{ color: "red" }}>CEO already existed!!</h4>}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Salary</FormLabel>
                            <Input
                                type="number"
                                placeholder="salary"
                                slotProps={{
                                    input: {
                                        ref: inputRef,
                                        min: 1,
                                        step: 1,
                                    },
                                }}
                                onChange={handleChange}
                                name="salary"
                                value={form.salary} />
                            <FormHelperText style={{ color: "green" }} >Salary need to be more than 0.</FormHelperText>
                        </FormControl>
                        {warningBlank && <h4 style={{ color: "red" }}>Can not leave any fields blank!!</h4>}

                        <Button style={{ marginTop: "16px" }} type="submit" >{submitButtonText}</Button>
                        <Button onClick={handleCloseButton}>Close</Button>
                    </form >
                </ModalDialog>
            </Modal >
        </>
    )
}