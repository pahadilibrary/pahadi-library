import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Lost in the Mountains</h2>
      <p>
        The page you&apos;re looking for doesn&apos;t exist — perhaps it wandered off into the valleys.
      </p>
      <Link href="/" className="btn-filled">Back to Home</Link>
    </div>
  );
}
