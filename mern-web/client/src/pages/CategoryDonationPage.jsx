import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { donationCategories } from "../data/mockData";
import { uploadApi, requestApi } from "../api/client";

export default function CategoryDonationPage() {
    const { category } = useParams();

    const categoryInfo = useMemo(
        () => donationCategories.find((item) => item.slug === category),
        [category]
    );

    const [form, setForm] = useState({
        itemName: "",
        description: "",
        quantity: 1,
        address: "",
        imageUrl: "",
    });
    const [notice, setNotice] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    if (!categoryInfo) {
        return (
            <section className="container section">
                <h2>Category not found</h2>
            </section>
        );
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsUploading(true);
            const url = await uploadApi.uploadImage(file);
            setForm((p) => ({ ...p, imageUrl: url }));
        } catch (err) {
            console.error(err);
            alert("Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Using requestApi.create to register this item donation on the backend
            await requestApi.create({
                title: `Donation Offer: ${form.itemName}`,
                description: `${form.quantity}x ${form.itemName} - ${form.description} [Image: ${form.imageUrl}]`,
                category: categoryInfo.title,
                urgency: "Medium",
                address: form.address || "Contact me",
            });
            setNotice("Donation request saved successfully. Our team will contact you.");
            setForm({ itemName: "", description: "", quantity: 1, address: "", imageUrl: "" });
        } catch (err) {
            console.error("Donation offer failed", err);
            alert("Failed to save donation.");
        }
    };

    return (
        <section className="container section two-col">
            <article className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '24px' }}>
                    <i className="ph ph-hand-heart"></i>
                </div>
                <div className="eyebrow">{categoryInfo.title} Donation</div>
                <h2>{categoryInfo.subtitle}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '400px' }}>
                    Fill out the form with your donation details. You can upload an image of the items you wish to donate.
                </p>
            </article>

            <article className="glass-card">
                <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="ph ph-package"></i> Item Details
                </h3>
                <form className="form-grid" onSubmit={onSubmit}>
                    <label>
                        Item Name
                        <div style={{ position: 'relative' }}>
                            <i className="ph ph-tag" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}></i>
                            <input
                                value={form.itemName}
                                onChange={(e) => setForm((p) => ({ ...p, itemName: e.target.value }))}
                                required
                                placeholder="e.g. Winter Coats"
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </label>
                    <label>
                        Description
                        <textarea
                            rows="3"
                            value={form.description}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, description: e.target.value }))
                            }
                            placeholder="Condition, size, notes..."
                        />
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <label>
                            Quantity
                            <div style={{ position: 'relative' }}>
                                <i className="ph ph-hash" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}></i>
                                <input
                                    type="number"
                                    min="1"
                                    value={form.quantity}
                                    onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))}
                                    required
                                    style={{ paddingLeft: '40px' }}
                                />
                            </div>
                        </label>
                        <label>
                            Pickup Address
                            <div style={{ position: 'relative' }}>
                                <i className="ph ph-map-pin" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}></i>
                                <input
                                    value={form.address}
                                    onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                                    required
                                    placeholder="City, ZIP"
                                    style={{ paddingLeft: '40px' }}
                                />
                            </div>
                        </label>
                    </div>
                    <label>
                        Image Upload
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ flex: 1 }} />
                            {isUploading && <div style={{ display: 'flex', alignItems: 'center', color: 'var(--cyan)' }}><i className="ph ph-spinner-gap ph-spin"></i> Uploading...</div>}
                        </div>
                        {form.imageUrl && !isUploading && (
                            <div style={{ marginTop: '12px', borderRadius: '12px', overflow: 'hidden', height: '120px', width: '100%', border: '1px solid var(--glass-border)' }}>
                                <img src={form.imageUrl} alt="preview" style={{ width: "100%", height: '100%', objectFit: "cover" }} />
                            </div>
                        )}
                    </label>
                    
                    <button className="btn" type="submit" disabled={isUploading} style={{ width: '100%', marginTop: '16px' }}>
                        {isUploading ? "Please wait..." : <><i className="ph ph-paper-plane-right"></i> Submit Donation</>}
                    </button>
                    {notice && <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="ph ph-check-circle"></i> {notice}</div>}
                </form>
            </article>
        </section>
    );
}
