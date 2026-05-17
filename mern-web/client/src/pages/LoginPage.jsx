import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await authApi.login({ email, password });
            login(data);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="container section auth-wrap">
            <h2>Welcome Back</h2>
            <form className="form-grid" onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button className="btn" type="submit">
                    Login
                </button>
            </form>
            {error && <p className="error-text">{error}</p>}
            <p>
                New user? <Link to="/register">Create account</Link>
            </p>
        </section>
    );
}
