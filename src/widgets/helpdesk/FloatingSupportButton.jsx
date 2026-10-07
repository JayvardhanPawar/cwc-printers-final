import { useEffect, useRef, useState } from 'react';
import TicketForm from './TicketForm.jsx';
import './TicketForm.css';
import './FloatingSupportButton.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function FloatingSupportButton() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const wasOpen = useRef(false);

  // Escape to close + focus trap
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll(FOCUSABLE);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Move focus into panel on open; return to trigger only after a close
  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  return (
    <div className="hd-widget hd-root">
      {!open && (
        <button
          ref={triggerRef}
          type="button"
          className="hd-fab"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="hd-fab-iconwrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="hd-fab-icon">
              <path
                fill="currentColor"
                d="M12 3.5c-5.25 0-9.5 3.4-9.5 7.6 0 2.42 1.4 4.58 3.58 5.98-.12 1.1-.5 2.3-1.24 3.3a.4.4 0 0 0 .43.63c1.9-.42 3.4-1.28 4.36-1.96.74.13 1.52.21 2.37.21 5.25 0 9.5-3.4 9.5-7.6s-4.25-7.6-9.5-7.6Z"
              />
            </svg>
            <span className="hd-fab-status" />
          </span>
          <span className="hd-fab-text">
            <span className="hd-fab-title">Facing an issue?</span>
            <span className="hd-fab-sub">Raise a complaint</span>
          </span>
        </button>
      )}

      {open && (
        <div className="hd-overlay" onClick={() => setOpen(false)}>
          <div
            ref={panelRef}
            className="hd-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Raise a complaint"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="hd-panel-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="hd-close-icon" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6.4 4.98 4.98 6.4 10.59 12l-5.6 5.6 1.4 1.4 5.6-5.58 5.6 5.6 1.4-1.42-5.58-5.6 5.6-5.6-1.42-1.4-5.6 5.6Z"
                />
              </svg>
            </button>
            <div className="hd-panel-body">
              <TicketForm onSubmitted={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}