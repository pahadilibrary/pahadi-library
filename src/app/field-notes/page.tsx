import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Field Notes — Dispatches from the Archive',
  description: 'Stories from the field, personal dispatches, and essays on Himalayan culture, music, and memory. Coming soon.',
};

export default function FieldNotesPage() {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-inner">
        <span className="section-label">Coming Soon</span>
        <h1>Field Notes</h1>
        <p>
          A column of personal dispatches — stories from Tehri Garhwal, conversations
          with village elders, the songs heard on mountain paths, and the culture
          quietly disappearing with each passing generation.
        </p>
        <p>
          Written by Anshul Nautiyal and contributors from across the Himalayan diaspora.
        </p>
        <div className="coming-soon-divider">&#9650;</div>
        <p className="coming-soon-sub">Check back soon.</p>
      </div>
    </div>
  );
}
