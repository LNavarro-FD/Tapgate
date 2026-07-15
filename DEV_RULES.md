# Tapgate — Development Rules

## Version Numbering

| Change type | Example | When to use |
|-------------|---------|-------------|
| Patch fix | `2.4.0 → 2.4.1` | Bug fix, typo, small correction |
| Feature addition | `2.4.x → 2.5.0` | New functionality added |
| Breaking / major rebuild | `2.x.x → 3.0.0` | Architecture change, major rewrite |

- `index.html` versioned as `APP_VERSION` constant — always visible in header as `FD SCANNER Vx.x.x`
- `stats.html` versioned independently — currently `v1.x.x`, shown in stats header
- Both versions must be bumped on every deploy to their respective file

---

## Pre-Change Checklist

1. **Fetch current file from GitHub** — never edit a stale local copy
2. **Tag the current state** before any change:
   - Stable release: `vX.X.X-stable`
   - Before risky feature: `vX.X.X-pre-[feature-name]`
3. **Confirm the tag exists** before writing a single line

---

## Every Deploy

1. Fetch fresh file from GitHub
2. Make changes
3. **Bump version** in `APP_VERSION` (index.html) or version div (stats.html)
4. **Syntax check**: `node --check /tmp/check.js` — never skip this
5. Deploy with commit message: `v[version] — [what changed]`
6. Verify pushed SHA matches expected commit

---

## Commit Message Format

```
v2.4.1 — fix Firebase poll key mismatch on session restore
v2.5.0 — add table number field to booking drawer
```

Always `v[version] — [plain English description]`. No jargon, no ticket numbers.

---

## Deployment Pipeline

```
Dev (local /home/claude/) → Syntax check → GitHub main → GitHub Pages (live)
```

- **No live deployments without explicit green light from Louise**
- **Code freeze 48 hours before any event**
- **Revert immediately on breakage** — never patch incrementally on a broken deploy
- Stats code always in `stats.html` only — never in `index.html`

---

## Architecture Rules

- **MEC + WooCommerce = primary source of truth** — Google Sheet and Firebase are supplementary only
- **Firebase REST API only** — no module imports (Safari compatibility)
- **No hardcoded IDs or credentials** — all from QR payload (`cfg.u`, `cfg.k`, `cfg.s`, `cfg.sheet`, `cfg.events`)
- **Stats always in stats.html only** — never add stats logic to index.html
- **Sheet column mapping must be header-based** — never positional

## Known Failure Patterns

- `double async async function` — syntax error
- `const` inside `if` without braces — scoping bug
- `sessionStorage` doesn't persist across pages in Safari iOS
- WPCodeBox silently saves empty snippets — always verify save
- Hardcoded sheet IDs break multi-client use
- `{$wpdb->table}` interpolation in WPCodeBox PHP — use string concatenation instead
- `array_filter` with anonymous function in WPCodeBox PHP — use `foreach` instead

---

## Repo

- **Repo**: `LNavarro-FD/Tapgate`
- **Live**: `https://lnavarro-fd.github.io/Tapgate/`
- **Firebase**: `https://funky-dory-fdscan-default-rtdb.europe-west1.firebasedatabase.app`
- **Firebase paths**: `mecCheckins/`, `rfCheckins/`, `sheetCheckins/`, `undos/`

## WPCodeBox Snippets (funkydorylove.co.uk)

| Snippet | Purpose |
|---------|---------|
| FD Checkin Proxy | POST checkin + DELETE undo via `fd2/v1/checkin` |
| Checkin Read Proxy | Read checkin state |
| FD bulk2 | Bulk attendee data endpoint |
| FD CORS Headers | Allow cross-origin requests |
| FD REST Auth Bypass | Allow unauthenticated REST access |
| FD Invoice Resolver | Resolve invoice IDs |
| FD Checkin Reset — TEST ONLY | Reset checkin state — never run on event day |

---

## Current Versions

| File | Version | Last updated |
|------|---------|-------------|
| index.html | v2.5.22 | 2026-07-15 |
| stats.html | v1.3.9 | 2026-07-14 |
| FD Checkin Proxy | v2.8 | 2026-07-10 |
| setup.html | v1.1.0 | 2026-07-14 |
| FD Checkin Proxy | v2.8 | 2026-07-10 |
| FD bulk2 | v4.x | — |

