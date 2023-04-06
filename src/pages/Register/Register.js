import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
    return (
        <div>
            <h1>Sign up to post</h1>
            <p>Create your user and share your stories</p>
            <form>
                <label>
                    <span>Nome:</span>
                    <input type="text" name="displayName" required placeholder="User name" />
                </label>
                <label>
                    <span>Email:</span>
                    <input type="email" name="email" required placeholder="User email" />
                </label>
                <label>
                    <span>Password:</span>
                    <input type="password" name="password" required placeholder="Enter your password" />
                </label>
                <label>
                    <span>Password confirm:</span>
                    <input type="password" name="confirmPassword" required placeholder="Confirm your password" />
                </label>
                <button className="btn">Sign Up</button>
            </form>
        </div>
    )
}

export default Register