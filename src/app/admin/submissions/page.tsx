'use client';

import { useEffect, useState } from 'react';

interface Submission {
  id: string;
  contributor_name: string;
  contributor_village: string;
  song_name: string;
  occasion: string;
  lyrics: string;
  cultural_context: string;
  youtube_link: string;
  email: string;
  status: string;
  admin_notes: string;
  created_at: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/admin/submissions')
      .then(r => r.json())
      .then(data => { setSubmissions(data.submissions || []); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: string, admin_notes?: string) {
    const res = await fetch('/api/admin/submissions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, admin_notes: admin_notes || '' }),
    });

    if (res.ok) {
      setSubmissions(submissions.map(s => s.id === id ? { ...s, status, admin_notes: admin_notes || s.admin_notes } : s));
    }
  }

  async function deleteSubmission(id: string) {
    if (!confirm('Delete this submission permanently?')) return;

    const res = await fetch('/api/admin/submissions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setSubmissions(submissions.filter(s => s.id !== id));
    }
  }

  const filtered = filter === 'all' ? submissions : submissions.filter(s => s.status === filter);

  if (loading) return <div className="admin-page"><p>Loading submissions...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Submissions</h1>
          <p>{submissions.filter(s => s.status === 'pending').length} pending review</p>
        </div>
        <div className="admin-filter-tabs">
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`admin-filter-tab ${filter === f ? 'active' : ''}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== 'all' && ` (${submissions.filter(s => s.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-submissions-list">
        {filtered.map(sub => (
          <div key={sub.id} className={`admin-submission-card ${sub.status}`}>
            <div className="admin-submission-header" onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}>
              <div>
                <h3>{sub.song_name}</h3>
                <p>by {sub.contributor_name} {sub.contributor_village && `from ${sub.contributor_village}`}</p>
                <p className="admin-submission-date">
                  {new Date(sub.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="admin-submission-status">
                <span className={`admin-badge ${sub.status === 'pending' ? 'badge-orange' : sub.status === 'approved' ? 'badge-green' : 'badge-gray'}`}>
                  {sub.status}
                </span>
                <span className="admin-expand-icon">{expandedId === sub.id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expandedId === sub.id && (
              <div className="admin-submission-body">
                {sub.occasion && (
                  <div className="admin-submission-field">
                    <label>Occasion</label>
                    <p>{sub.occasion}</p>
                  </div>
                )}
                {sub.lyrics && (
                  <div className="admin-submission-field">
                    <label>Lyrics</label>
                    <pre>{sub.lyrics}</pre>
                  </div>
                )}
                {sub.cultural_context && (
                  <div className="admin-submission-field">
                    <label>Cultural Context</label>
                    <p>{sub.cultural_context}</p>
                  </div>
                )}
                {sub.youtube_link && (
                  <div className="admin-submission-field">
                    <label>YouTube</label>
                    <a href={sub.youtube_link} target="_blank" rel="noopener noreferrer">{sub.youtube_link}</a>
                  </div>
                )}
                {sub.email && (
                  <div className="admin-submission-field">
                    <label>Email</label>
                    <a href={`mailto:${sub.email}`}>{sub.email}</a>
                  </div>
                )}

                <div className="admin-submission-actions">
                  {sub.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(sub.id, 'approved')} className="admin-btn-primary">Approve</button>
                      <button onClick={() => updateStatus(sub.id, 'rejected')} className="admin-btn-secondary">Reject</button>
                    </>
                  )}
                  {sub.status !== 'pending' && (
                    <button onClick={() => updateStatus(sub.id, 'pending')} className="admin-btn-secondary">Reset to Pending</button>
                  )}
                  <button onClick={() => deleteSubmission(sub.id)} className="admin-btn-sm btn-danger">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text)' }}>
            <p>No {filter === 'all' ? '' : filter} submissions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
