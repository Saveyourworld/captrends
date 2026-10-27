
import React from 'react';
import HerbalLandingPage from './HerbalLandingPage';
import ElectricScrubberPage from './electric-scrubber/App.tsx';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/electric-scrubber') {
    return <ElectricScrubberPage />;
  }

  if (path === '/') {
    return <HerbalLandingPage />;
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Page not found</h1>
      <a href="/">Back to CapTrends</a>
    </main>
  );
}
