'use client';

import { useEffect, useState } from 'react';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  active: boolean;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/newsletter')
      .then(r => r.json())
      .then(data => { setSubscribers(data.subscribers || []); setLoading(false); });
  }, []);

  async function removeSubscriber(id: string, email: string) {
    if (!confirm(`Remove ${email} from the newsletter?`)) return;

    const res = await fetch('/api/admin/newsletter', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setSubscribers(subscribers.filter(s => s.id !== id));
    }
  }

  function copyAllEmails() {
    const emails = subscribers.filter(s => s.active).map(s => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    alert(`Copied ${subscribers.filter(s => s.active).length} emails to clipboard!`);
  }

  if (loading) return <div className="admin-page"><p>Loading subscribers...</p></div>;

  const activeCount = subscribers.filter(s => s.active).length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Newsletter</h1>
          <p>{activeCount} active subscriber{activeCount !== 1 ? 's' : ''}</p>
        </div>
        {activeCount > 0 && (
          <button onClick={copyAllEmails} className="admin-btn-primary">Copy All Emails</button>
        )}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Subscribed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub, i) => (
              <tr key={sub.id}>
                <td>{i + 1}</td>
                <td><a href={`mailto:${sub.email}`}>{sub.email}</a></td>
                <td>{new Date(sub.subscribed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td>
                  <span className={`admin-badge ${sub.active ? 'badge-green' : 'badge-gray'}`}>
                    {sub.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button onClick={() => removeSubscriber(sub.id, sub.email)} className="admin-btn-sm btn-danger">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {subscribers.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text)' }}>
            <p>No subscribers yet. The newsletter form on your site will collect emails here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
