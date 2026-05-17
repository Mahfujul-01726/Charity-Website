import { useState } from "react";
import { requestApi } from "../api/client";
import { useAuth } from "../context/AuthContext";

const steps = ["Details", "Items", "Review"];

export default function CreateRequestPage() {
    const { isAuthenticated } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "Food",
        urgency: "Medium",
        address: "",
    });

    const onNext = async () => {
        if (currentStep < 2) {
            setCurrentStep((p) => p + 1);
            return;
        }

        if (!isAuthenticated) {
            setError("Please login first to submit request.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            await requestApi.create(form);
            setNotice("Request created successfully.");
            setCurrentStep(0);
            setForm({
                title: "",
                description: "",
                category: "Food",
                urgency: "Medium",
                address: "",
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="container section">
            <h2>Create a Request</h2>
            <div className="steps-row">
                {steps.map((step, i) => (
                    <div key={step} className={`step-pill ${i <= currentStep ? "active" : ""}`}>
                        {step}
                    </div>
                ))}
            </div>

            <article className="glass-card">
                <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
                    {currentStep === 0 && (
                        <>
                            <label>
                                Request Title
                                <div style={{ position: 'relative' }}>
                                    <i className="ph ph-text-t" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}></i>
                                    <input
                                        value={form.title}
                                        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                                        style={{ paddingLeft: '40px' }}
                                        placeholder="e.g. Need Medical Supplies"
                                    />
                                </div>
                            </label>
                            <label>
                                Description
                                <textarea
                                    rows="4"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((p) => ({ ...p, description: e.target.value }))
                                    }
                                    placeholder="Provide detailed information about your request..."
                                />
                            </label>
                        </>
                    )}

                    {currentStep === 1 && (
                        <>
                            <label>
                                Category
                                <div style={{ position: 'relative' }}>
                                    <i className="ph ph-tag" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}></i>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                                        style={{ paddingLeft: '40px' }}
                                    >
                                        <option>Food</option>
                                        <option>Clothing</option>
                                        <option>Medical</option>
                                        <option>Education</option>
                                        <option>Disaster Relief</option>
                                    </select>
                                </div>
                            </label>
                            <label>
                                Urgency
                                <div style={{ position: 'relative' }}>
                                    <i className="ph ph-warning-circle" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}></i>
                                    <select
                                        value={form.urgency}
                                        onChange={(e) => setForm((p) => ({ ...p, urgency: e.target.value }))}
                                        style={{ paddingLeft: '40px' }}
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                            </label>
                            <label>
                                Delivery Address
                                <div style={{ position: 'relative' }}>
                                    <i className="ph ph-map-pin" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}></i>
                                    <input
                                        value={form.address}
                                        onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                                        style={{ paddingLeft: '40px' }}
                                        placeholder="Full address details"
                                    />
                                </div>
                            </label>
                        </>
                    )}

                    {currentStep === 2 && (
                        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)', marginBottom: '16px' }}>
                            <h3 style={{ marginBottom: '16px' }}>Review Request</h3>
                            <p style={{ marginBottom: '8px' }}><strong>Title:</strong> {form.title || "Not provided"}</p>
                            <p style={{ marginBottom: '8px' }}><strong>Description:</strong> {form.description || "Not provided"}</p>
                            <p style={{ marginBottom: '8px' }}><strong>Category:</strong> {form.category}</p>
                            <p style={{ marginBottom: '8px' }}><strong>Urgency:</strong> {form.urgency}</p>
                            <p style={{ marginBottom: '8px' }}><strong>Address:</strong> {form.address || "Not provided"}</p>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                        {currentStep > 0 && (
                            <button className="btn btn-outline" type="button" onClick={() => setCurrentStep(p => p - 1)} disabled={loading} style={{ flex: 1 }}>
                                <i className="ph ph-arrow-left"></i> Back
                            </button>
                        )}
                        <button className="btn" type="button" onClick={onNext} disabled={loading} style={{ flex: 1 }}>
                            {currentStep === 2 ? (loading ? "Submitting..." : <><i className="ph ph-check-circle"></i> Submit Request</>) : <>Next <i className="ph ph-arrow-right"></i></>}
                        </button>
                    </div>
                </form>
                {notice && <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="ph ph-check-circle"></i> {notice}</div>}
                {error && <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="ph ph-warning-circle"></i> {error}</div>}
            </article>
        </section>
    );
}
