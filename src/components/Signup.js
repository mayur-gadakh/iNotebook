import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';




const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = credentials;
        const response = await fetch(`http://127.0.0.1:5000/api/auth/createUser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);
        const notify = () => toast("User Already Exist");
        if (json.success) {
            //store the toen at the  local storage
            localStorage.setItem('token', json.authtoc);
            navigate("/");
        } else {
            notify();
        }



    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        //this says that setnote as the targeted name as targeted value
    }



    return (
        <div className='container mt-3'>
            <h2 className='text-center'>Signup to Continue </h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3 my-2">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="text" className="form-control" name='name' id="name" minLength={3} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@gmail.com" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" minLength={6} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default Signup
