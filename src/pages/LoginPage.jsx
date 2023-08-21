import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import { FormGroup } from '@mui/material';

export default function LoginPage() {
    const [loginForm, setLoginForm] = useState({
        Username: "",
        Password: ""
    })
    const handleForm = (e) => {
        setLoginForm((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    console.log(loginForm)
                }}
            >
                <FormGroup>
                    <FormControl sx={{ width: '28ch' }}>
                        <FormLabel >Username</FormLabel>
                        <Input type='text' name='Username' onChange={handleForm} placeholder="Username" />
                    </FormControl>
                    <FormControl sx={{ width: '28ch' }}>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' name='Password' onChange={handleForm} placeholder="Password" />
                    </FormControl>
                    <Button type='submit' style={{ marginTop: "20px" }}>Submit</Button>
                </FormGroup>
            </form>
        </div>
    );
}
