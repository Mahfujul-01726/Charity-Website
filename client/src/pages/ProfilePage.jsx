import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authApi, uploadApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";

export default function ProfilePage() {
    const { user, setUser } = useAuth();
    const { t } = useTranslation();
    
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
        if (!file) return;

        try {
            const url = await uploadApi.uploadImage(file);
            setForm((previous) => ({ ...previous, avatarUrl: url }));
        } catch (error) {
            console.error(error);
            alert(t("avatar_upload_failed"));
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();

        try {
            setIsSaving(true);
            const updatedUser = await authApi.updateProfile(form);
            setUser(updatedUser);
            setIsEditing(false);
            alert(t("profile_update_success"));
        } catch (error) {
            console.error(error);
            alert(error.message || t("profile_update_failed"));
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="container section">
            <article className="glass-card" style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2>{t("profile_details_title")}</h2>
                    <button className="btn btn-outline" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? t("cancel") : t("edit_profile_btn")}
                    </button>
                </div>

                {isEditing ? (
                    <form className="form-grid" onSubmit={handleSave} style={{ marginTop: "1rem" }}>
                        <label>
                            {t("avatar_label")}
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
                            {t("name")}
                            <input
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                required
                            />
                        </label>

                        <label>
                            {t("phone_number")}
                            <input
                                value={form.phone}
                                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                            />
                        </label>

                        <label>
                            {t("location")}
                            <input
                                value={form.address}
                                onChange={(event) => setForm({ ...form, address: event.target.value })}
                            />
                        </label>

                        <button className="btn" type="submit" disabled={isSaving}>
                            {isSaving ? t("saving") : t("save_changes")}
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
                            <strong>{t("name")}:</strong> {user?.name}
                        </p>
                        <p>
                            <strong>{t("email")}:</strong> {user?.email}
                        </p>
                        <p>
                            <strong>{t("phone_number")}:</strong> {user?.phone || t("not_set")}
                        </p>
                        <p>
                            <strong>{t("location")}:</strong> {user?.address || t("not_set")}
                        </p>
                        <p>
                            <strong>Role:</strong> {user?.role}
                        </p>
                    </div>
                )}
            </article>

            <div className="category-grid compact">
                <Link to="/history" className="category-card">
                    <h4>{t("my_donations")}</h4>
                    <p>{t("track_donations_sub")}</p>
                </Link>
                <Link to="/payments" className="category-card">
                    <h4>{t("payment_methods")}</h4>
                    <p>{t("manage_payments_sub")}</p>
                </Link>
                <Link to="/notifications" className="category-card">
                    <h4>{t("notifications")}</h4>
                    <p>{t("campaign_updates_sub")}</p>
                </Link>
                <Link to="/security" className="category-card">
                    <h4>{t("security")}</h4>
                    <p>{t("security_settings_sub")}</p>
                </Link>
                <Link to="/help" className="category-card">
                    <h4>{t("help_support_title")}</h4>
                    <p>{t("help_support_sub")}</p>
                </Link>
            </div>
        </section>
    );
}