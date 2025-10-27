import React, { useState, useEffect } from 'react';
import { connectSocket, joinTracking, socket } from '../services/socket';
import { fetchJob } from '../services/api';
import StatusTimeline from '../components/StatusTimeline';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function TrackPage() {
  const [input, setInput] = useState('');
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    connectSocket();
    socket.on('status_update', (data) => {
      if (job && data.trackingId === job.trackingId) {
        fetchJob(job.trackingId).then(setJob).catch(()=>{});
      }
    });

    return () => {
      socket.off('status_update');
    };
  }, [job]);

  async function handleTrack(e) {
    e?.preventDefault();
    if (!input) return;
    setLoading(true);
    setStatusMsg('');
    try {
      const j = await fetchJob(input);
      setJob(j);
      joinTracking(j.trackingId);
    } catch (err) {
      setJob(null);
      setStatusMsg('Tracking ID not found');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Track your repair</h2>
      <form onSubmit={handleTrack} className="form-row">
        <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enter tracking ID (e.g., R-ABC123)" />
        <button type="submit">Track</button>
        <button type="button" onClick={() => {
          fetch(`${API_BASE}/api/jobs`).then(r=>r.json()).then(jobs => {
            if (jobs.length) {
              setInput(jobs[0].trackingId);
            }
          });
        }}>Get latest demo ID</button>
      </form>

      {loading && <div>Loading...</div>}
      {statusMsg && <div className="error">{statusMsg}</div>}

      {job && (
        <div className="card">
          <h3>Tracking: {job.trackingId}</h3>
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Customer:</strong> {job.customer?.name} / {job.customer?.phone}</p>
          <p><strong>Item:</strong> {job.item?.type} {job.item?.brand} {job.item?.model}</p>
          <p><em>Last updated: {new Date(job.updatedAt).toLocaleString()}</em></p>

          <StatusTimeline current={job.status} />

          <h4>Notes</h4>
          <ul>
            {job.notes.map((n, i) => <li key={i}>{new Date(n.ts).toLocaleString()}: {n.text}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
