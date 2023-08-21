import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


export default function LoginPage() {

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const handleOnChange = (event) => {
        setLoginForm({
            ...loginForm, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(loginForm);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <TextField name="username" label="Username" onChange={handleOnChange} style={{ marginBottom: "12px" }} />
                    <TextField name="password" type="password" label="Password" onChange={handleOnChange} style={{ marginBottom: "12px" }} />
                    <Button type="submit" variant="contained">Submit</Button>
                </FormControl>
            </form>
        </div>
    )
}