import { db } from "../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError("");

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;
        } catch (error) {
            // console.log(error.message);
            // console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("weak-password")) {
                systemErrorMessage = "Password must contain at least 6 characters.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail already registered.";
            } else {
                systemErrorMessage = "An error occurred, please try again later.";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }

    }

    // logout -sing out

    const logout = () => {
        // deal with memory leak
        checkIfIsCancelled();

        signOut(auth);
    };

    // login - sing in
    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {

            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "User not found!";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Wrong password";
            } else {
                systemErrorMessage = "An error occurred, please try again later.";
            };

            setError(systemErrorMessage);
            setLoading(false);
        }
    }



    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
}