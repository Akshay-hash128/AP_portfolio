// src/components/ContactForm.jsx
import React, { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjboepl"; // ← replace with your Formspree ID

const INITIAL = { name: "", email: "", subject: "", message: "" };

function validate(fields) {
    const errors = {};
    if (!fields.name.trim()) errors.name = "Name is required.";
    if (!fields.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(fields.email)) errors.email = "Enter a valid email.";
    if (!fields.subject.trim()) errors.subject = "Subject is required.";
    if (fields.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
    return errors;
}

export default function ContactForm() {
    const [fields, setFields] = useState(INITIAL);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields(f => ({ ...f, [name]: value }));
        if (touched[name]) {
            const errs = validate({ ...fields, [name]: value });
            setErrors(prev => ({ ...prev, [name]: errs[name] }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(t => ({ ...t, [name]: true }));
        const errs = validate(fields);
        setErrors(prev => ({ ...prev, [name]: errs[name] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate(fields);
        if (Object.keys(errs).length) {
            setErrors(errs);
            setTouched({ name: true, email: true, subject: true, message: true });
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(fields),
            });
            if (res.ok) {
                setStatus("success");
                setFields(INITIAL);
                setTouched({});
                setErrors({});
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="contact-form contact-success">
                <span className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button className="btn-secondary" onClick={() => setStatus("idle")}>Send another</button>
            </div>
        );
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row-group">
                <div className={`form-row ${errors.name && touched.name ? "has-error" : ""}`}>
                    <label htmlFor="cf-name">Name</label>
                    <input
                        id="cf-name" name="name" type="text"
                        placeholder="Akshay Padmanabhuni"
                        value={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="name"
                    />
                    {errors.name && touched.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className={`form-row ${errors.email && touched.email ? "has-error" : ""}`}>
                    <label htmlFor="cf-email">Email</label>
                    <input
                        id="cf-email" name="email" type="email"
                        placeholder="you@example.com"
                        value={fields.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                    />
                    {errors.email && touched.email && <span className="field-error">{errors.email}</span>}
                </div>
            </div>

            <div className={`form-row ${errors.subject && touched.subject ? "has-error" : ""}`}>
                <label htmlFor="cf-subject">Subject</label>
                <input
                    id="cf-subject" name="subject" type="text"
                    placeholder="Collaboration / Question / Hello"
                    value={fields.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.subject && touched.subject && <span className="field-error">{errors.subject}</span>}
            </div>

            <div className={`form-row ${errors.message && touched.message ? "has-error" : ""}`}>
                <label htmlFor="cf-message">Message</label>
                <textarea
                    id="cf-message" name="message"
                    rows="5"
                    placeholder="Tell me about your project, question, or idea..."
                    value={fields.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.message && touched.message && <span className="field-error">{errors.message}</span>}
            </div>

            {status === "error" && (
                <p className="form-submit-error">Something went wrong. Please try again or email me directly.</p>
            )}

            <button className="btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? (
                    <span className="btn-loading">
                        <span className="spinner" /> Sending…
                    </span>
                ) : (
                    <>
                        Send Message
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </>
                )}
            </button>
        </form>
    );
}
