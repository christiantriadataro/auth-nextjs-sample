"use client";
import Link from "next/link"
import React, {useState} from "react";
import {useRouter} from "next/navigation";

import axios from "axios"

const SignupPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignup = async () => {

    }

    const handleEmailChange = event => setUser({...user, email: event.target.value})
    const handlePasswordChange = event => setUser({...user, password: event.target.value})
    const handleUsernameChange = event => setUser({...user, username: event.target.value})

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>SignupPage</h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4"
                type="text"
                id="username"
                value={user.username}
                onChange={handleUsernameChange}
                placeholder="Username: "
            />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4"
                type="text"
                id="email"
                value={user.email}
                onChange={handleEmailChange}
                placeholder="Email: "
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4"
                type="text"
                id="password"
                value={user.password}
                onChange={handlePasswordChange}
                placeholder="Password: "
            />
            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4"
            >
                Signup
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    )
}

export default SignupPage