import { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import {
  MessageCircle, X, Send, Loader2, CheckCircle2,
  Printer, Wrench, Download, Heart, Handshake, Briefcase, MoreHorizontal,
} from 'lucide-react';

/**
 * SupportWidget (EmailJS version)
 * --------------------------------
 * Floating "Support" button + slide-out panel. Submits through EmailJS
 * (emailjs.sendForm), so there is no backend and no Odoo call.
 *
 * Usage:
 *   <SupportWidget />
 *   <SupportWidget position="left" />
 *   <SupportWidget templateId="template_xxx" serviceId="service_xxx" />
 *
 * Fields (same as the Odoo "Submit a Ticket" form, plus two additions):
 *   Full Name *, Phone Number, Email Address *, Company Name,
 *   Product Serial Number *,  Message Subject *, Ask Your Question *,
 *   Partner Information (checkbox -> Partner Name / Mobile / Email / Company)
 *
 * EmailJS template variables this widget sends:
 *   inquiry_type, full_name, first_name, last_name, email, reply_to, phone,
 *   company, serial_number, subject, message, source,
 *   is_partner ('Yes' or ''), partner_name, partner_mobile, partner_email,
 *   partner_company.
 */

const EMAILJS_SERVICE_ID = 'service_p225ler';
const EMAILJS_TEMPLATE_ID = 'template_qouod1f';
const EMAILJS_PUBLIC_KEY = 'dSnlxhYulQcDZ24j7';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INQUIRY_TYPES = [
  { id: 'quote', label: 'Product Quote', icon: Printer },
  { id: 'service', label: 'Service & Repair', icon: Wrench },
  { id: 'drivers', label: 'Drivers & Software', icon: Download },
  { id: 'consumables', label: 'Consumables', icon: Heart },
  { id: 'partnership', label: 'Partnership', icon: Handshake },
  { id: 'careers', label: 'Careers', icon: Briefcase },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

const emptyForm = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  serialNumber: '',
  subject: '',
  message: '',
  partnerName: '',
  partnerMobile: '',
  partnerEmail: '',
  partnerCompany: '',
  website: '', // honeypot: real users never see or fill this
};

export default function SupportWidget({
  position = 'right',
  serviceId = EMAILJS_SERVICE_ID,
  templateId = EMAILJS_TEMPLATE_ID,
  publicKey = EMAILJS_PUBLIC_KEY,
}) {
  const [open, setOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState('quote');
  const [isPartner, setIsPartner] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [banner, setBanner] = useState(null); // { title, message }
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const panelRef = useRef(null);
  const formRef = useRef(null);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Lock background scroll while the panel is open, and move focus into it.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const resetAll = useCallback(() => {
    setForm(emptyForm);
    setInquiryType('quote');
    setIsPartner(false);
    setFieldErrors({});
    setBanner(null);
    setStatus('idle');
  }, []);

  const handleClose = () => {
    setOpen(false);
    // After a successful send, wipe everything once the close animation is done.
    // If the user just closed it mid-way, keep their text draft.
    if (status === 'success') {
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(resetAll, 200);
    }
  };

  // After a successful send, show the thank-you message for a moment,
  // then close the panel automatically and reset the form.
  useEffect(() => {
    if (status !== 'success') return;
    const t = setTimeout(() => {
      setOpen(false);
      resetTimer.current = setTimeout(resetAll, 200);
    }, 3000);
    return () => clearTimeout(t);
  }, [status, resetAll]);

  const handleChange = (name) => (e) => {
    setForm((f) => ({ ...f, [name]: e.target.value }));
  };

  function validate() {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!form.email.trim() || !EMAIL_RE.test(form.email.trim())) {
      errors.email = 'A valid Email Address is required.';
    }
    if (!form.serialNumber.trim()) {
      errors.serialNumber = 'Product Serial Number is required.';
    }
    if (!form.subject.trim()) errors.subject = 'Message Subject is required.';
    if (!form.message.trim()) errors.message = 'Please enter your question.';

    // Partner info is optional, but if an email is typed it must be valid.
    if (isPartner && form.partnerEmail.trim() && !EMAIL_RE.test(form.partnerEmail.trim())) {
      errors.partnerEmail = 'Enter a valid partner email address.';
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBanner(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Honeypot filled = bot. Pretend it worked, send nothing.
    if (form.website) {
      setStatus('success');
      return;
    }

    setStatus('sending');

    try {
      // sendForm reads every named input inside the <form>, including the
      // hidden ones below, and passes them to the template.
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setStatus('success');
    } catch (err) {
      // Real cause goes to the console (bad IDs, quota, network, etc.)
      console.error('[SupportWidget] EmailJS send failed:', err);
      setStatus('idle');
      setBanner({
        title: 'Message not sent',
        message: 'Please try again, or call us on 1800 212 7110.',
      });
    }
  }

  const sending = status === 'sending';
  const sent = status === 'success';
  const sideClass = position === 'left' ? 'left' : 'right';

  const inquiryLabel =
    INQUIRY_TYPES.find((t) => t.id === inquiryType)?.label || inquiryType;
  const [firstName, ...restName] = form.fullName.trim().split(/\s+/);

  return (
    <>
      <style>{CSS}</style>

      <button
        type="button"
        className={`hdw-fab hdw-fab-${sideClass}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open support form"
      >
        <MessageCircle size={20} strokeWidth={2} />
        <span className="hdw-fab-label">Support</span>
      </button>

      {open && (
        <div className={`hdw-overlay hdw-overlay-${sideClass}`} onClick={handleClose}>
          <div
            className="hdw-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Submit a support ticket"
            ref={panelRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hdw-panel-head">
              {sent ? <span /> : <h2>Submit a Ticket</h2>}
              <button type="button" className="hdw-close" onClick={handleClose} aria-label="Close">
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="hdw-panel-body">
              {sent ? (
                <div className="hdw-success">
                  <div className="hdw-success-icon">
                    <CheckCircle2 size={30} color="#fff" strokeWidth={2} />
                  </div>
                  <h3>Thank you!</h3>
                  <p>We will reach out to you.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  {/* Values that are not plain inputs, so sendForm can read them */}
                  <input type="hidden" name="source" value="Support Widget" />
                  <input type="hidden" name="inquiry_type" value={inquiryLabel} />
                  <input type="hidden" name="first_name" value={firstName || ''} />
                  <input type="hidden" name="last_name" value={restName.join(' ')} />
                  <input type="hidden" name="reply_to" value={form.email.trim()} />
                  <input type="hidden" name="is_partner" value={isPartner ? 'Yes' : ''} />

                  {banner && (
                    <div className="hdw-banner hdw-banner-error" role="alert">
                      <strong>{banner.title}</strong>
                      {banner.message}
                    </div>
                  )}

                  {/* Inquiry type pills */}
                  <div className="hdw-field">
                    <span className="hdw-label" id="hdw-inquiry-label">I'm enquiring about</span>
                    <div className="hdw-pills" role="radiogroup" aria-labelledby="hdw-inquiry-label">
                      {INQUIRY_TYPES.map(({ id, label, icon: Icon }) => {
                        const active = inquiryType === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            className={`hdw-pill${active ? ' hdw-pill-active' : ''}`}
                            onClick={() => setInquiryType(id)}
                          >
                            <Icon size={15} strokeWidth={2} />
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Field label="Full Name" required error={fieldErrors.fullName}>
                    <input
                      type="text"
                      name="full_name"
                      autoComplete="name"
                      value={form.fullName}
                      onChange={handleChange('fullName')}
                    />
                  </Field>

                  <Field label="Email Address" required error={fieldErrors.email}>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange('email')}
                    />
                  </Field>

                  <div className="hdw-row">
                    <Field label="Phone Number">
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange('phone')}
                      />
                    </Field>
                    <Field label="Company Name">
                      <input
                        type="text"
                        name="company"
                        autoComplete="organization"
                        value={form.company}
                        onChange={handleChange('company')}
                      />
                    </Field>
                  </div>

                  <Field label="Product Serial Number" required error={fieldErrors.serialNumber}>
                    <input
                      type="text"
                      name="serial_number"
                      autoComplete="off"
                      value={form.serialNumber}
                      onChange={handleChange('serialNumber')}
                    />
                  </Field>

                  <Field label="Message Subject" required error={fieldErrors.subject}>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange('subject')}
                    />
                  </Field>

                  <Field label="Ask Your Question" required error={fieldErrors.message}>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange('message')}
                    />
                  </Field>

                  {/* Partner Information: a yes/no checkbox that reveals 4 fields */}
                  <div className="hdw-partner">
                    <label className="hdw-check">
                      <input
                        type="checkbox"
                        checked={isPartner}
                        onChange={(e) => setIsPartner(e.target.checked)}
                      />
                      <span>
                        <strong>Partner Information</strong>
                        <small>Tick this to add partner details to your ticket.</small>
                      </span>
                    </label>

                    {isPartner && (
                      <div className="hdw-partner-fields">
                        <Field label="Partner Name">
                          <input
                            type="text"
                            name="partner_name"
                            value={form.partnerName}
                            onChange={handleChange('partnerName')}
                          />
                        </Field>
                        <div className="hdw-row">
                          <Field label="Mobile Number">
                            <input
                              type="tel"
                              name="partner_mobile"
                              value={form.partnerMobile}
                              onChange={handleChange('partnerMobile')}
                            />
                          </Field>
                          <Field label="Company">
                            <input
                              type="text"
                              name="partner_company"
                              value={form.partnerCompany}
                              onChange={handleChange('partnerCompany')}
                            />
                          </Field>
                        </div>
                        <Field label="Email" error={fieldErrors.partnerEmail}>
                          <input
                            type="email"
                            name="partner_email"
                            value={form.partnerEmail}
                            onChange={handleChange('partnerEmail')}
                          />
                        </Field>
                      </div>
                    )}
                  </div>

                  {/* Honeypot: hidden from people, tempting to bots */}
                  <div className="hdw-hp" aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={handleChange('website')}
                      />
                    </label>
                  </div>

                  <button type="submit" className="hdw-submit" disabled={sending}>
                    {sending ? (
                      <>
                        <Loader2 size={17} className="hdw-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Ticket
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className={`hdw-field${error ? ' hdw-invalid' : ''}`}>
      <label>
        {label} {required && <span className="hdw-req">*</span>}
        {children}
      </label>
      {error && <div className="hdw-field-error">{error}</div>}
    </div>
  );
}

const CSS = `
.hdw-fab,
.hdw-overlay {
  --hdw-brand: #082b1a;        /* main colour: FAB, active pill, submit */
  --hdw-brand-hover: #0d3d26;
  --hdw-ink: #1f2a25;
  --hdw-muted: #6b7280;
  --hdw-line: #dfe8e4;
  --hdw-error: #b3261e;
  --hdw-ok: #1f9d55;
}

.hdw-fab {
  position: fixed;
  bottom: 24px;
  z-index: 9998;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--hdw-brand);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 14px 20px 14px 16px;
  font-size: 14px;
  font-weight: 700;
  font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  box-shadow: 0 6px 18px rgba(8, 43, 26, 0.3);
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}
.hdw-fab:hover { background: var(--hdw-brand-hover); transform: translateY(-1px); }
.hdw-fab:focus-visible,
.hdw-pill:focus-visible,
.hdw-close:focus-visible,
.hdw-submit:focus-visible {
  outline: 3px solid rgba(31, 157, 85, 0.45);
  outline-offset: 2px;
}
.hdw-fab-right { right: 24px; }
.hdw-fab-left { left: 24px; }

.hdw-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8, 43, 26, 0.35);
  z-index: 9999;
  display: flex;
  align-items: stretch;
}
.hdw-overlay-right { justify-content: flex-end; }
.hdw-overlay-left { justify-content: flex-start; }

.hdw-panel {
  width: 440px;
  max-width: 100vw;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--hdw-ink);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.14);
  outline: none;
}

.hdw-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--hdw-line);
}
.hdw-panel-head h2 { font-size: 19px; font-weight: 800; margin: 0; }

.hdw-close {
  background: none;
  border: none;
  color: var(--hdw-muted);
  cursor: pointer;
  padding: 4px;
  line-height: 0;
  border-radius: 6px;
}
.hdw-close:hover { color: var(--hdw-ink); }

.hdw-panel-body {
  padding: 20px 24px 28px;
  overflow-y: auto;
  flex: 1;
}

.hdw-field { margin-bottom: 16px; min-width: 0; }
.hdw-field label,
.hdw-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}
.hdw-field label input,
.hdw-field label select,
.hdw-field label textarea { margin-top: 6px; font-weight: 400; }
.hdw-req { color: var(--hdw-error); }

.hdw-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.hdw-field input,
.hdw-field textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #d3ddd8;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: var(--hdw-ink);
  background: #fff;
}
.hdw-field textarea { min-height: 110px; resize: vertical; }
.hdw-field input:focus,
.hdw-field textarea:focus {
  outline: none;
  border-color: var(--hdw-brand);
  box-shadow: 0 0 0 3px rgba(8, 43, 26, 0.12);
}
.hdw-invalid input,
.hdw-invalid textarea { border-color: var(--hdw-error); }
.hdw-field-error { color: var(--hdw-error); font-size: 12.5px; margin-top: 6px; }
/* Inquiry pills (match the Contact page) */
.hdw-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.hdw-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--hdw-line);
  background: #fff;
  color: #6b7280;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}
.hdw-pill:hover { border-color: var(--hdw-brand); color: var(--hdw-brand); }
.hdw-pill-active,
.hdw-pill-active:hover {
  background: var(--hdw-brand);
  border-color: var(--hdw-brand);
  color: #fff;
}

/* Partner Information */
.hdw-partner {
  border: 1px solid var(--hdw-line);
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 16px;
}
.hdw-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}
.hdw-check input {
  width: 17px;
  height: 17px;
  margin: 2px 0 0;
  accent-color: var(--hdw-brand);
  flex-shrink: 0;
  cursor: pointer;
}
.hdw-check strong { display: block; font-size: 13.5px; }
.hdw-check small { display: block; font-size: 12px; color: var(--hdw-muted); margin-top: 2px; }
.hdw-partner-fields {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--hdw-line);
}
.hdw-partner-fields .hdw-field:last-child { margin-bottom: 0; }

.hdw-banner {
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13.5px;
  margin-bottom: 18px;
}
.hdw-banner strong { display: block; margin-bottom: 2px; }
.hdw-banner-error {
  background: #fdecea;
  border: 1px solid #f3b4ac;
  color: var(--hdw-error);
}

.hdw-submit {
  width: 100%;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--hdw-brand);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s ease;
}
.hdw-submit:hover { background: var(--hdw-brand-hover); }
.hdw-submit:disabled { opacity: 0.65; cursor: not-allowed; }

.hdw-spin { animation: hdw-spin 0.8s linear infinite; }
@keyframes hdw-spin { to { transform: rotate(360deg); } }

/* Honeypot: off-screen, not display:none (some bots skip display:none) */
.hdw-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }

.hdw-success { text-align: center; padding: 56px 0 24px; }
.hdw-success-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--hdw-ok);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
}
.hdw-success h3 { font-size: 24px; font-weight: 800; margin: 0 0 12px; }
.hdw-success p { font-size: 14.5px; color: var(--hdw-muted); margin: 0 0 4px; line-height: 1.5; }
@media (max-width: 480px) {
  .hdw-fab-label { display: none; }
  .hdw-fab { padding: 14px; }
  .hdw-panel { width: 100vw; }
  .hdw-row { grid-template-columns: 1fr; gap: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .hdw-fab, .hdw-pill, .hdw-submit { transition: none; }
  .hdw-spin { animation-duration: 2s; }
}
`;