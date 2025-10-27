import React from 'react';

const steps = ['received', 'repairing', 'completed'];

export default function StatusTimeline({ current = 'received' }) {
  return (
    <div className="timeline">
      {steps.map((s, idx) => {
        const active = steps.indexOf(current) >= idx;
        return (
          <div key={s} className={`step ${active ? 'active' : ''}`}>
            <div className="circle">{idx+1}</div>
            <div className="label">{s}</div>
            {idx < steps.length - 1 && <div className="bar" />}
          </div>
        );
      })}
    </div>
  );
}
