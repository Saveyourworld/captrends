import React, { lazy, Suspense } from 'react';
import HerbalLandingPage from './HerbalLandingPage';

const ElectricScrubberPage = lazy(() => import('./electric-scrubber/App.tsx'));

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/electric-scrubber') {
    return <Suspense fallback={<p style={{padding:24}}>Loading Electric Scrubber…</p>}><ElectricScrubberPage /></Suspense>;
  }
  if (path === '/') return <HerbalLandingPage />;
  return <main style={{padding:32}}><h1>Page not found</h1><a href="/">Back to CapTrends</a></main>;
}
