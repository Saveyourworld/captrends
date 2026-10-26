# CapTrends + Electric Scrubber integration

Main homepage: `/` (existing HerbalLandingPage). Electric Scrubber: `/electric-scrubber`.

## Deploy through GitHub
Work on the `electric-scrubber` branch. Upload the **contents** of this folder to the root of the main site GitHub repository (do not nest in a second folder). Commit to the branch and verify the branch preview, then open a pull request to merge after testing.

## Local tests
`npm install` then `npm run build`, `npm run dev`. Open `/` and `/electric-scrubber`. Test responsive layout, video, order form, EmailJS and WhatsApp manually.

Netlify should use build command `npm run build`, publish directory `dist`. The `public/_redirects` file handles client routes. Never replace DNS records or create a second domain.

## Notes
The original code has not been rewritten except for asset path updates within the Electric Scrubber TSX files and a lazy-loaded routing entry in `src/App.jsx`. The existing CapTrends homepage files are preserved. The new page imports its separate CSS; some globally styled selectors may affect it.
