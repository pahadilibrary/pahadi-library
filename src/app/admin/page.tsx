'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalSongs: number;
  publishedSongs: number;
  draftSongs: number;
  pendingSubmissions: number;
  totalSubmissions: number;
  newsletterSubscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function loadStats() {
      const [songsRes, subsRes, newsRes] = await Promise.all([
        fetch('/api/admin/songs'),
        fetch('/api/admin/submissions'),
        fetch('/api/admin/newsletter'),
      ]);

      const songsData = await songsRes.json();
      const subsData = await subsRes.json();
      const newsData = await newsRes.json();

      const songs = songsData.songs || [];
      const submissions = subsData.submissions || [];
      const subscribers = newsData.subscribers || [];

      setStats({
        totalSongs: songs.length,
        publishedSongs: songs.filter((s: { status: string }) => s.status === 'published').length,
        draftSongs: songs.filter((s: { status: string }) => s.status === 'draft').length,
        pendingSubmissions: submissions.filter((s: { status: string }) => s.status === 'pending').length,
        totalSubmissions: submissions.length,
        newsletterSubscribers: subscribers.filter((s: { active: boolean }) => s.active).length,
      });
    }
    loadStats();
  }, []);

  if (!stats) {
    return <div className="admin-page"><p>Loading dashboard...</p></div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Overview of your Himalaya Folk</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-number">{stats.publishedSongs}</div>
          <div className="admin-stat-label">Published Songs</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-number">{stats.draftSongs}</div>
          <div className="admin-stat-label">Draft Songs</div>
        </div>
        <div className="admin-stat-card accent">
          <div className="admin-stat-number">{stats.pendingSubmissions}</div>
          <div className="admin-stat-label">Pending Submissions</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-number">{stats.newsletterSubscribers}</div>
          <div className="admin-stat-label">Newsletter Subscribers</div>
        </div>
      </div>

      <div className="admin-quick-actions">
        <h2>Quick Actions</h2>
        <div className="admin-actions-grid">
          <Link href="/admin/songs/new" className="admin-action-card">
            <span className="admin-action-icon">+</span>
            <span>Add New Song</span>
          </Link>
          <Link href="/admin/submissions" className="admin-action-card">
            <span className="admin-action-icon">✉</span>
            <span>Review Submissions ({stats.pendingSubmissions})</span>
          </Link>
          <Link href="/admin/songs" className="admin-action-card">
            <span className="admin-action-icon">♪</span>
            <span>Manage Songs ({stats.totalSongs})</span>
          </Link>
          <Link href="/admin/newsletter" className="admin-action-card">
            <span className="admin-action-icon">◈</span>
            <span>View Subscribers ({stats.newsletterSubscribers})</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
