import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await authApi.register(form);
            login(data);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="container section auth-wrap">
            <h2>Create Your Account</h2>
            <form className="form-grid" onSubmit={handleSubmit}>
                <label>
                    Full Name
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </label>
                <button className="btn" type="submit">
                    Register
                </button>
            </form>
            {error && <p className="error-text">{error}</p>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </section>
    );
}
