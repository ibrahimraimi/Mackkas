# Performance Optimization

Mackkas is designed for speed and efficiency.

## Core Optimizations

### 1. Asset Management
- **Image Formats:** Use of `.webp` and `.avif` where possible for superior compression.
- **Explicit Sizing:** Images have defined dimensions to prevent layout shifts.
- **Kebab-case Naming:** Clean, URL-safe naming for all assets.

### 2. Frontend Efficiency
- **Minimal Dependencies:** No heavy JS frameworks; pure Vanilla JS for zero overhead.
- **Efficient Filtering:** Client-side filtering for fast response times on catalog searches.
- **Asynchronous Sync:** Cart syncing happens in the background via Fetch API.

### 3. Backend Performance
- **Indexed Database:** SQLite handles queries efficiently for the current scale.
- **JSON responses:** Lightweight data transfer format.

## Benchmarks
- **Lighthouse Performance Score:** Target > 90.
- **First Contentful Paint:** Target < 1s.
- **Cumulative Layout Shift:** Target < 0.1.
