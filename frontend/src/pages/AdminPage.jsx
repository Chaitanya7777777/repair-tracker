import React, { useState, useEffect } from 'react';
import { createJob, listJobs, updateJobStatus } from '../services/api';
import { joinTracking } from '../services/socket';

const ADMIN_PASSWORD = 'hackathon123'; // MVP password (change later if needed)

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    type: '',
    brand: '',
    model: '',
    problemDescription: ''
  });
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (authorized) fetchJobs();
  }, [authorized]);

  async function fetchJobs() {
    try {
      const all = await listJobs();
      setJobs(all);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    const payload = {
      customer: { name: form.customerName, phone: form.customerPhone },
      item: { type: form.type, brand: form.brand, model: form.model, problemDescription: form.problemDescription }
    };
    try {
      const res = await createJob(payload);
      setJobs(prev => [res.job, ...prev]);
      setForm({
        customerName: '',
        customerPhone: '',
        type: '',
        brand: '',
        model: '',
        problemDescription: ''
      });
    } catch (err) {
      alert('Failed to create job');
    }
  }

  async function changeStatus(trackingId, newStatus) {
    const note = prompt('Optional note for this update:');
    try {
      await updateJobStatus(trackingId, { status: newStatus, note });
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert('Failed to update status. The job may already be completed.');
      fetchJobs();
    }
  }

  function handleAuth(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthorized(true);
    } else {
      alert('Wrong password. Use "hackathon123" for MVP or change ADMIN_PASSWORD in backend.');
    }
  }

  if (!authorized) {
    return (
      <div>
        <h2>Admin (MVP)</h2>
        <form onSubmit={handleAuth}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
          />
          <button type="submit">Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div className="card">
        <h3>Create new job</h3>
        <form onSubmit={handleCreate} className="form-col">
          <input
            placeholder="Customer name"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          />
          <input
            placeholder="Customer phone"
            value={form.customerPhone}
            onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
          />
          <input
            placeholder="Item type (phone, laptop...)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
          <input
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
          <input
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          <input
            placeholder="Problem description"
            value={form.problemDescription}
            onChange={(e) => setForm({ ...form, problemDescription: e.target.value })}
          />
          <button type="submit">Create Job</button>
        </form>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>All jobs</h3>
        <table className="job-table">
          <thead>
            <tr>
              <th>Tracking</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.trackingId}>
                <td>{job.trackingId}</td>
                <td>
                  {job.customer?.name} / {job.customer?.phone}
                </td>
                <td>
                  {job.item?.type} {job.item?.brand} {job.item?.model}
                </td>
                <td>{job.status}</td>
                <td>{new Date(job.updatedAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => changeStatus(job.trackingId, 'repairing')}
                    disabled={job.status === 'completed'}
                    title={
                      job.status === 'completed'
                        ? 'Cannot update a completed job'
                        : 'Mark as repairing'
                    }
                  >
                    Mark Repairing
                  </button>

                  <button
                    onClick={() => changeStatus(job.trackingId, 'completed')}
                    disabled={job.status === 'completed'}
                    title={
                      job.status === 'completed'
                        ? 'Job already completed'
                        : 'Mark as completed'
                    }
                    style={{ marginLeft: 8 }}
                  >
                    Mark Completed
                  </button>

                  <button
                    onClick={() => {
                      joinTracking(job.trackingId);
                      alert('Joined socket room for demo clients');
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    Join Room
                  </button>

                  {job.status === 'completed' && (
                    <div
                      style={{
                        color: '#0b5fff',
                        marginTop: 6,
                        fontSize: 12,
                      }}
                    >
                      ✅ Completed — updates disabled
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
