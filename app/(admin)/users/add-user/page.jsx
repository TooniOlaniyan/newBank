'use client'

import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; // App Router hook for navigation

const Page = () => {
    const router = useRouter(); // For navigation
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const nameInputRef = useRef(null); // Create a ref for the name input field

    // Focus on the name input field when the component mounts
    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus(); // Focus the name input field
        }
    }, []); // Empty dependency array ensures this runs only once after the first render

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state

        // Simple form validation
        if (!name || !email) {
            setError("All fields are required");
            return;
        }

        try {
            const response = await fetch("/api/add-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: name, password: email }),
            });

            if (!response.ok) {
                throw new Error("Failed to save user");
            }

            const data = await response.json();
            toast.success(`User added: ${data.user.name}`, { position: "top-right" });

            // Reset form fields
            setName("");
            setEmail("");

            // Navigate to add-details page after user creation
            router.push("/users/add-details");
        } catch (error) {
            toast.error(error.message || "Something went wrong!", { position: "top-right" });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl mb-4 text-center">Add User</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label className="block mb-2" htmlFor="name">Username</label>
                        <input
                            type="text"
                            id="name"
                            ref={nameInputRef} // Attach the ref to the input field
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" // Add focus styles
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="email">Password</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" // Add focus styles
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Add User</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Page;
