"use client";
import Link from "next/link"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading,setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data)
            toast.success("Login success");
            router.push("/profile")
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // @ts-ignore
    const handleEmailChange = event => setUser({...user, email: event.target.value})
    // @ts-ignore
    const handlePasswordChange = event => setUser({...user, password: event.target.value})
    // @ts-ignore
    const handleUsernameChange = event => setUser({...user, username: event.target.value})


    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
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
                onClick={onLogin}
                className={`p-2 border border-gray-300 rounded-lg mb-4 ${buttonDisabled ? "text-rose-500" : "text-green-500"}`}
                disabled={buttonDisabled}
            >
                Login
            </button>
            <Link href="/signup">Signup first</Link>
        </div>
    )
}

export default LoginPage