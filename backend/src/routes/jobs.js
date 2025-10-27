// backend/src/routes/jobs.js
const express = require('express');

module.exports = (jobsStore, notifier) => {
  const router = express.Router();

  // POST /api/jobs  -> create job (staff or public)
  router.post('/', (req, res) => {
    const { customer = {}, item = {} } = req.body;
    const trackingId = require('../utils/trackingId').generateTrackingId();
    const now = new Date();

    const job = {
      trackingId,
      customer: {
        name: customer.name || 'Unknown',
        phone: customer.phone || ''
      },
      item: {
        type: item.type || 'Unknown',
        brand: item.brand || '',
        model: item.model || '',
        problemDescription: item.problemDescription || ''
      },
      status: 'received',
      notes: [
        { ts: now.toISOString(), text: 'Job created' }
      ],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    jobsStore[trackingId] = job;
    // emit a creation event (optional)
    notifier.emitStatusUpdate(job.trackingId, job);

    res.status(201).json({ trackingId, job });
  });

  // GET /api/jobs/:trackingId -> public status
  router.get('/:trackingId', (req, res) => {
    const { trackingId } = req.params;
    const job = jobsStore[trackingId];
    if (!job) return res.status(404).json({ error: 'Not found' });
    return res.json(job);
  });

  // PUT /api/jobs/:trackingId/status -> update status & add note
  router.put('/:trackingId/status', (req, res) => {
    const { trackingId } = req.params;
    const { status, note } = req.body;

    const job = jobsStore[trackingId];
    if (!job) return res.status(404).json({ error: 'Not found' });

    // Prevent any further status updates if the job is already completed
    if (job.status === 'completed') {
      // If client sent the same 'completed' status again, allow it (idempotent).
      if (status && status !== 'completed') {
        return res.status(400).json({ error: 'Cannot change status: job is already completed.' });
      }
      // otherwise just return the job (no-op)
      return res.status(200).json(job);
    }

    // Normal update flow (allowed if not completed)
    if (status) job.status = status;
    if (note) job.notes.push({ ts: new Date().toISOString(), text: note });

    job.updatedAt = new Date().toISOString();

    // emit update via socket.io to clients joined on this trackingId
    notifier.emitStatusUpdate(job.trackingId, {
      trackingId: job.trackingId,
      status: job.status,
      note: note || null,
      updatedAt: job.updatedAt
    });

    return res.json(job);
  });


  // Optional: list all jobs (for admin)
  router.get('/', (req, res) => {
    // simple listing (array)
    const allJobs = Object.values(jobsStore).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(allJobs);
  });

  return router;
};
