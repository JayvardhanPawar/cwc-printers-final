// /**
//  * helpdeskApi.js
//  *
//  * All network calls to the helpdesk backend live here. Components never
//  * call fetch() directly — they call these functions, so the request/
//  * response shape only needs to change in one place if the API changes.
//  *
//  * Set VITE_HELPDESK_API_URL in your app's .env, pointing at wherever
//  * the helpdesk backend is deployed (a separate domain in this setup).
//  */

// const API_BASE = import.meta.env.VITE_HELPDESK_API_URL || 'https://azure-guanaco-292474.hostingersite.com';

// /** @returns {Promise<{id: number, name: string}[]>} */
// export async function fetchTeams() {
//   const res = await fetch(`${API_BASE}/api/helpdesk/teams`);
//   const body = await res.json();

//   if (!res.ok || !body.success) {
//     throw new Error('Could not load issue types.');
//   }
//   return body.teams;
// }

// /**
//  * @param {object} ticket - { fullName, phone, email, company, subject, question, team_id }
//  * @returns {Promise<{ticketId: number, ticketNumber: string}>}
//  */
// export async function submitTicket(ticket) {
//   const res = await fetch(`${API_BASE}/api/helpdesk/ticket`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(ticket),
//   });
//   const body = await res.json();

//   if (!res.ok || !body.success) {
//     const errors = body.errors || ['Something went wrong. Please try again.'];
//     throw new Error(errors.join(' '));
//   }

//   return { ticketId: body.ticketId, ticketNumber: body.ticketNumber };
// }
// \





/**
 * helpdeskApi.js
 *
 * All network calls to the helpdesk backend live here. Components never
 * call fetch() directly — they call these functions, so the request/
 * response shape only needs to change in one place if the API changes.
 *
 * Set VITE_HELPDESK_API_URL in your app's .env, pointing at wherever
 * the helpdesk backend is deployed (a separate domain in this setup).
 */

const API_BASE = import.meta.env.VITE_HELPDESK_API_URL || 'https://azure-guanaco-292474.hostingersite.com';

/**
 * @param {object} ticket - { fullName, phone, email, company, subject, question, serialNumber }
 * @param {File|null} [attachment] - optional file from an <input type="file">
 * @returns {Promise<{ticketId: number, ticketNumber: string, warning?: string}>}
 *
 * Sent as multipart/form-data (not JSON) so the attachment can ride
 * along in the same request — that's what lets the backend actually
 * forward the file to Odoo instead of silently dropping it.
 */
export async function submitTicket(ticket, attachment) {
  const formData = new FormData();
  Object.entries(ticket).forEach(([key, value]) => {
    formData.append(key, value ?? '');
  });
  if (attachment) {
    formData.append('attachment', attachment);
  }

  const res = await fetch(`${API_BASE}/api/helpdesk/ticket`, {
    method: 'POST',
    body: formData, // no Content-Type header — the browser sets the multipart boundary itself
  });
  const body = await res.json();

  if (!res.ok || !body.success) {
    const errors = body.errors || ['Something went wrong. Please try again.'];
    throw new Error(errors.join(' '));
  }

  return { ticketId: body.ticketId, ticketNumber: body.ticketNumber, warning: body.warning };
}