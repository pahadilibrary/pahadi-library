'use client';

import { useState } from 'react';
import styles from './SongDetailClient.module.css';

export default function SongDetailClient({
  culturalContext,
  songTitle,
  audioUrl,
}: {
  culturalContext: string;
   songTitle: string;
  audioUrl: string;
}) {
  const [contextOpen, setContextOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.songTitle}>{songTitle}</h1>
        <div className={styles.audioPlayer}>
          <audio controls className={styles.audioControls}>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>

      <div className={styles.contextSection}>
        <button
          className={`${styles.contextToggle} ${contextOpen ? styles.open : ''}`}
          onClick={() => setContextOpen(!contextOpen)}
          aria-expanded={contextOpen}
        >
          <div className={styles.toggleContent}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
            <span>Cultural Context</span>
          </div>
          <svg 
            className={styles.chevron} 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        <div className={`${styles.contextBody} ${contextOpen ? styles.contentOpen : ''}`}>
          <div className={styles.contextContent}>
            {culturalContext}
          </div>
        </div>
      </div>
    </div>
  );
}