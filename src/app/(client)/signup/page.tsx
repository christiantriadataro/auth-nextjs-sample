"use client";
import Link from "next/link"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";

const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    // @ts-ignore
    const handleEmailChange = event => setUser({...user, email: event.target.value})
    // @ts-ignore
    const handlePasswordChange = event => setUser({...user, password: event.target.value})
    // @ts-ignore
    const handleUsernameChange = event => setUser({...user, username: event.target.value})

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Signup"}</h1>
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
                className={`p-2 border border-gray-300 rounded-lg mb-4 ${buttonDisabled ? "text-rose-500" : "text-green-500"}`}
                disabled={buttonDisabled}
            >
                Signup
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    )
}

export default SignupPage