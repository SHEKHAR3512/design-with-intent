# Brief 03: Music Discovery & Queue Manager

## 1. Product Summary
- **Product Name:** Resonate Indie Audio
- **Domain:** Independent music streaming & artist-direct discovery
- **Mode:** Create

## 2. Audience & Context
- **Users:** Audiophiles and casual music listeners actively curating listening sessions.
- **Environment:** Desktop browser while working; mobile web on public transit.
- **Mental State:** Immersive, explorative, valuing album artwork and audio fidelity.

## 3. Primary Task
Discover emerging tracks, inspect artist liner notes, and manage an active playback queue (reorder upcoming songs, remove tracks, or save queue as a playlist).

## 4. Key Invariant Constraints
- Persistent playback bar must not obscure queue controls or main track discovery.
- Drag-and-drop reordering must provide accessible keyboard equivalents (e.g. Move Up / Move Down buttons or shortcut keys).
- Track timing and queue position counters must use monospaced tabular numerals.

## 5. Required Interface States
- **Now Playing:** Highlighting active track waveform/progress, artist, and bitrate badge.
- **Up Next Queue:** Ordered list with drag handle, track title, artist, duration, and remove action.
- **Empty Queue:** Discovery suggestions ("Queue empty: Add recommended indie tracks based on your recent plays").
- **Loading / Buffering State:** Subtle audio waveform pulse without shifting layout.

## 6. Acceptance Criteria
- [ ] Active playing track is clearly distinguishable through multiple visual attributes (playing icon, elevation, border).
- [ ] All icon buttons (Play/Pause, Skip, Shuffle, Reorder) have explicit `aria-label`s.
- [ ] Responsive drawer for queue on screens narrower than 768px.
