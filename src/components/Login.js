import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault()


        const response = await fetch(`http://127.0.0.1:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //store the toen at the  local storage
            localStorage.setItem('token', json.authtoc);
            navigate("/");

        }
        else {
            alert("invalid password");
        }
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        //this says that setnote as the targeted name as targeted value
    }




    return (
        <div className='container mt-3'>
            <h2 className='text-center'>Login to Continue</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3 my-2">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' placeholder="name@gmail.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
