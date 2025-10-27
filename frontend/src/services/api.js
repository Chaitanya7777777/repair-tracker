const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function createJob(payload) {
  const res = await fetch(`${API_BASE}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export async function fetchJob(trackingId) {
  const res = await fetch(`${API_BASE}/api/jobs/${trackingId}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export async function updateJobStatus(trackingId, body) {
  const res = await fetch(`${API_BASE}/api/jobs/${trackingId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

export async function listJobs() {
  const res = await fetch(`${API_BASE}/api/jobs`);
  if (!res.ok) throw new Error('List failed');
  return res.json();
}
