import { useState } from 'react';
import { submitTicket } from './helpdeskApi.js';

// No "Issue Type" / team picker — every ticket submitted through this
// form is filed under the single fixed team the backend is configured
// with (HELPDESK_TEAM_ID). See backend/src/config/index.js if that
// ever changes.
const EMPTY_FORM = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  subject: '',
  question: '',
  serialNumber: '',
};

const REQUIRED_FIELDS = ['fullName', 'email', 'subject', 'question'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * TicketForm
 *
 * Pure form component, no outer page chrome — meant to be rendered
 * inside the floating widget's panel (or anywhere else you like).
 * Call onSubmitted() if you want the parent (e.g. the panel) to react
 * to a successful submission, such as auto-closing after a delay.
 */
export default function TicketForm({ onSubmitted }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [attachment, setAttachment] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [banner, setBanner] = useState(null); // { type: 'error', message }
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [warning, setWarning] = useState(null); // e.g. attachment failed but ticket was created
  const [fileInputKey, setFileInputKey] = useState(0); // bump to force the (uncontrolled) file input to clear

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFileChange(e) {
    setAttachment(e.target.files[0] || null);
  }

  function validate() {
    const errors = {};
    REQUIRED_FIELDS.forEach((name) => {
      if (!form[name] || !form[name].trim()) errors[name] = true;
    });
    if (form.email && !EMAIL_RE.test(form.email)) errors.email = true;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBanner(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await submitTicket(form, attachment);
      setTicketId(result.ticketId);
      // The ticket itself always succeeds even if the attachment upload
      // failed on the backend side — surface that separately.
      setWarning(result.warning || null);
      if (onSubmitted) onSubmitted(result);
    } catch (err) {
      setBanner({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  function resetToForm() {
    setForm(EMPTY_FORM);
    setAttachment(null);
    setFieldErrors({});
    setBanner(null);
    setTicketId(null);
    setWarning(null);
    setFileInputKey((k) => k + 1);
  }

  if (ticketId !== null) {
    return (
      <div className="hd-success">
        <h2 className="hd-success-title">Thank you!</h2>
        <p className="hd-success-text">Your ticket has been sent.</p>
        <p className="hd-success-text">Our team will get right on it.</p>
        <div className="hd-badge">Ticket #{String(ticketId).padStart(5, '0')}</div>
        {warning && <div className="hd-banner hd-banner-error">{warning}</div>}
        <a className="hd-new-ticket-link" onClick={resetToForm}>
          Submit another ticket
        </a>
      </div>
    );
  }

  return (
    <div className="hd-form-card">
      <h1 className="hd-title">Submit a Support Ticket</h1>

      {banner && (
        <div className={`hd-banner hd-banner-${banner.type}`}>
          <strong>Could not submit ticket</strong>
          <div>{banner.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className={`hd-field ${fieldErrors.fullName ? 'hd-invalid' : ''}`}>
          <label htmlFor="hd-fullName">
            Full Name <span className="hd-req">*</span>
          </label>
          <input id="hd-fullName" name="fullName" value={form.fullName} onChange={handleChange} autoComplete="name" />
          {fieldErrors.fullName && <div className="hd-field-error">Full Name is required.</div>}
        </div>

        <div className="hd-field">
          <label htmlFor="hd-phone">Phone Number</label>
          <input id="hd-phone" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" />
        </div>

        <div className={`hd-field ${fieldErrors.email ? 'hd-invalid' : ''}`}>
          <label htmlFor="hd-email">
            Email Address <span className="hd-req">*</span>
          </label>
          <input id="hd-email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />
          {fieldErrors.email && <div className="hd-field-error">A valid Email Address is required.</div>}
        </div>

        <div className="hd-field">
          <label htmlFor="hd-company">Company Name</label>
          <input id="hd-company" name="company" value={form.company} onChange={handleChange} autoComplete="organization" />
        </div>

        <div className={`hd-field ${fieldErrors.subject ? 'hd-invalid' : ''}`}>
          <label htmlFor="hd-subject">
            Message Subject <span className="hd-req">*</span>
          </label>
          <input id="hd-subject" name="subject" value={form.subject} onChange={handleChange} />
          {fieldErrors.subject && <div className="hd-field-error">Message Subject is required.</div>}
        </div>

        <div className={`hd-field ${fieldErrors.question ? 'hd-invalid' : ''}`}>
          <label htmlFor="hd-question">
            Ask Your Question <span className="hd-req">*</span>
          </label>
          <textarea id="hd-question" name="question" value={form.question} onChange={handleChange} />
          {fieldErrors.question && <div className="hd-field-error">Please enter your question.</div>}
        </div>

        <div className={`hd-field ${fieldErrors.serialNumber ? 'hd-invalid' : ''}`}>
          <label htmlFor="hd-serialNumber">
            Serial Number <span className="hd-req">*</span>
          </label>
          <input id="hd-serialNumber" name="serialNumber" value={form.serialNumber} onChange={handleChange} />
        </div>

        <div className="hd-field">
          <label htmlFor="hd-attachment">Attachment</label>
          <input key={fileInputKey} type="file" id="hd-attachment" name="attachment" onChange={handleFileChange} />
          {attachment && <div className="hd-field-hint">{attachment.name}</div>}
        </div>

        <button type="submit" className="hd-submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit Ticket'}
        </button>
      </form>
    </div>
  );
}