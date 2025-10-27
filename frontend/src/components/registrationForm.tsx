import { useState } from "react";
import { Link } from "react-router-dom";

export type RegistrationInput = {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}

interface RegistrationFormProps {
    onSubmit: (formDetails: RegistrationInput) => void;
}

export const RegistrationForm = (props: RegistrationFormProps) => {
    // Logic needs to go here
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = () => props.onSubmit({
        email,
        username,
        firstName,
        lastName
    })

    return (
        <div className="registration-form">
            <div>Create Account</div>
            <input
                id="email"
                className="registration email"
                type="email"
                autoComplete="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
                id="username"
                className="registatation-input username"
                type="text"
                autoComplete="username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
                id="first-name"
                className="registatation-input username"
                type="text"
                autoComplete="given-name"
                placeholder="first name"
                onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <input
                id="last-name"
                className="registatation-input username"
                type="text"
                placeholder="last name"
                onChange={(e) => setLastName(e.target.value)}
            ></input>
            <div>
                <div className="to-login">
                    <div>Already have an account?</div>
                    <Link to="/login">Login</Link>
                </div>
                <button onClick={() => handleSubmit()} className="submit-button" type="submit">
                    Submit
                </button>
            </div>
        </div>
    );
}