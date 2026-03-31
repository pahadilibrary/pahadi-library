'use client';

import { useState } from 'react';

export default function SongDetailClient({
  culturalContext,
  audioUrl,
  songTitle,
}: {
  culturalContext: string;
  audioUrl: string;
  songTitle: string;
}) {
  const [contextOpen, setContextOpen] = useState(false);

  return (
    <div className="context-section">
      <button
        className={`context-toggle${contextOpen ? ' open' : ''}`}
        onClick={() => setContextOpen(!contextOpen)}
      >
        Cultural Context
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div className={`context-body${contextOpen ? ' open' : ''}`}>
        {culturalContext}
      </div>
    </div>
  );
}
