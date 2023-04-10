import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        const user = {
            displayName,
            email,
            password
        }

        if (password !== confirmPassword) {
            setError("Passwords need to be the same!");
            return;
        }

        console.log(user);
    }

    return (
        <div className={styles.register}>
            <h1>Sign up to post</h1>
            <p>Create your user and share your stories</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name="displayName"
                        required
                        placeholder="User name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="User email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password confirm:</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button className="btn">Sign Up</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Register