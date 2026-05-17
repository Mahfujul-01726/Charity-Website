import { useState } from "react";
import { Link } from "react-router-dom";

import { authApi, uploadApi } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
    const { user, setUser } = useAuth();
    const [form, setForm] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
        avatarUrl: user?.avatarUrl || "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleAvatarUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        try {
            const url = await uploadApi.uploadImage(file);
            setForm((previous) => ({ ...previous, avatarUrl: url }));
        } catch (error) {
            console.error(error);
            alert("Failed to upload avatar");
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();

        try {
            setIsSaving(true);
            const updatedUser = await authApi.updateProfile(form);
            setUser(updatedUser);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert(error.message || "Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="container section">
            <article className="glass-card" style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>Profile Details</h2>
                    <button className="btn btn-outline" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                {isEditing ? (
                    <form className="form-grid" onSubmit={handleSave} style={{ marginTop: "1rem" }}>
                        <label>
                            Avatar
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                {form.avatarUrl && (
                                    <img
                                        src={form.avatarUrl}
                                        alt="Avatar"
                                        style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }}
                                    />
                                )}
                                <input type="file" accept="image/*" onChange={handleAvatarUpload} />
                            </div>
                        </label>

                        <label>
                            Name
                            <input
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                required
                            />
                        </label>

                        <label>
                            Phone
                            <input
                                value={form.phone}
                                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                            />
                        </label>

                        <label>
                            Address
                            <input
                                value={form.address}
                                onChange={(event) => setForm({ ...form, address: event.target.value })}
                            />
                        </label>

                        <button className="btn" type="submit" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                ) : (
                    <div style={{ marginTop: "1rem" }}>
                        {form.avatarUrl && (
                            <img
                                src={form.avatarUrl}
                                alt="Avatar"
                                style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: "10px" }}
                            />
                        )}
                        <p>
                            <strong>Name:</strong> {user?.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user?.phone || "Not set"}
                        </p>
                        <p>
                            <strong>Address:</strong> {user?.address || "Not set"}
                        </p>
                        <p>
                            <strong>Role:</strong> {user?.role}
                        </p>
                    </div>
                )}
            </article>

            <div className="category-grid compact">
                <Link to="/history" className="category-card">
                    <h4>My Donations</h4>
                    <p>Track your contribution timeline.</p>
                </Link>
                <Link to="/payments" className="category-card">
                    <h4>Payment Methods</h4>
                    <p>Manage cards and bank accounts.</p>
                </Link>
                <Link to="/notifications" className="category-card">
                    <h4>Notifications</h4>
                    <p>Campaign and donation updates.</p>
                </Link>
                <Link to="/security" className="category-card">
                    <h4>Security</h4>
                    <p>2FA, alerts, and privacy controls.</p>
                </Link>
                <Link to="/help" className="category-card">
                    <h4>Help & Support</h4>
                    <p>FAQ, support channels, and guidance.</p>
                </Link>
            </div>
        </section>
    );
}