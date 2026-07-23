# Video Optimization Guide

## Current Status

**taco-birria-animation.mp4: 4.2 MB** for a 5-second video is large for mobile.

### Target Optimization:
- Mobile-first: 480px width max
- 5-second duration
- **Target size: 500 KB - 1 MB**
- **Current: 4.2 MB → Needed: 80-90% reduction**

---

## Why Videos Are Large

- **H.264 codec** (default MP4): Lower compression
- **High bitrate**: Unnecessary for mobile
- **Unnecessary resolution**: Likely 1080p+ when 480px needed
- **No optimization**: Raw export from video editor

---

## Optimization Strategy

### 1. **Reduce Resolution**
- Current: Likely 1080p or higher
- Target: 480p (matches mobile viewport width)
- Result: ~60% size reduction

### 2. **Reduce Bitrate**
- Current: Likely 8-15 Mbps
- Target: 800-1200 Kbps (mobile)
- Result: ~70-85% size reduction

### 3. **Use Modern Codec**
- Current: H.264 (older, larger files)
- Target: H.265/HEVC (30-50% smaller)
- Mobile fallback: Keep H.264 version

### 4. **Create Multiple Formats**
```
taco-birria-animation.mp4      (H.264, 480p, 1 Mbps) = ~625 KB
taco-birria-animation.webm     (VP9, 480p, 800 Kbps) = ~500 KB
taco-birria-animation-mobile.mp4 (H.264, 360p, 600 Kbps) = ~375 KB
```

---

## How to Optimize Videos

### Option 1: Online Tools (Easiest)

#### Using [Handbrake](https://handbrake.fr/) (Free, Desktop):

1. Download Handbrake
2. Open `taco-birria-animation.mp4`
3. Settings:
   - **Video Codec**: H.265 (faster encode)
   - **Bitrate**: 800 Kbps
   - **Resolution**: 480x? (width locked to 480)
   - **Framerate**: 30 FPS (auto)
4. Output: `taco-birria-animation.h265.mp4`
5. Repeat with:
   - **Codec**: H.264 (for older devices)
   - **Bitrate**: 1000 Kbps

#### Using FFmpeg (Command Line):

```bash
# H.265 version (most efficient)
ffmpeg -i taco-birria-animation.mp4 -vf scale=480:-1 -c:v libx265 -crf 28 -b:v 800k taco-birria-animation-h265.mp4

# H.264 fallback (better compatibility)
ffmpeg -i taco-birria-animation.mp4 -vf scale=480:-1 -c:v libx264 -crf 28 -b:v 1000k taco-birria-animation-h264.mp4

# WebM version (VP9 - smaller)
ffmpeg -i taco-birria-animation.mp4 -vf scale=480:-1 -c:v libvpx-vp9 -crf 30 -b:v 800k taco-birria-animation.webm
```

#### Online: [Cloudconvert.com](https://cloudconvert.com/)

1. Upload `taco-birria-animation.mp4`
2. Select H.265 or VP9 codec
3. Set bitrate to 800 Kbps
4. Set resolution to 480p
5. Download optimized version

#### Online: [Handbrake Cloud](https://www.handbrake.fr/) (if available)

---

## Expected Results

| Version | Codec | Bitrate | Resolution | Size | Load Time (4G) |
|---------|-------|---------|------------|------|---|
| Current | H.264 | ~12 Mbps | 1080p+ | 4.2 MB | 13s |
| Optimized | H.264 | 1000 Kbps | 480p | ~625 KB | 2s |
| Best | H.265 | 800 Kbps | 480p | ~500 KB | 1.6s |
| Fallback | H.264 | 1000 Kbps | 480p | ~625 KB | 2s |

**Result: 7x faster loading** ⚡

---

## Implementation

### Update Video Tag (Multiple Formats):

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  disablePictureInPicture
  preload="metadata"
>
  <source src={d.video} type="video/mp4; codecs=hev1.1.6.L93.B0" />
  <source src={`${d.video.replace('.mp4', '.webm')}`} type="video/webm" />
</video>
```

### Add Poster Frame (Show Before Loading):

Extract first frame from video:
```bash
ffmpeg -i taco-birria-animation.mp4 -ss 00:00:00 -vframes 1 taco-birria-poster.jpg
```

Then add to video tag:
```tsx
<video poster="/taco-birria-poster.jpg" ...>
```

---

## File Structure After Optimization

```
public/
├── taco-birria-animation.mp4          (480p, H.264, 1000 Kbps) ~625 KB
├── taco-birria-animation.webm         (480p, VP9, 800 Kbps) ~500 KB
├── taco-birria-animation-h265.mp4     (480p, H.265, 800 Kbps) ~500 KB
└── taco-birria-poster.jpg             (poster frame) ~50 KB
```

---

## CSS Optimizations (Already Added)

✅ Hardware acceleration enabled:
- `transform: translateZ(0)` - GPU rendering
- `backface-visibility: hidden` - Smooth playback

✅ Preload strategy:
- `preload="metadata"` - Only load first frame
- Autoplay w/ muted - Browser allows instant play

---

## Before & After

### Before:
```
Load: 4.2 MB
Time: ~13 seconds on 4G
Device storage: 4.2 MB per video
```

### After:
```
Load: 500 KB - 1 MB (H.265)
Time: 1-2 seconds on 4G ⚡
Device storage: 500 KB per video
```

---

## Quick Summary

1. **Download Handbrake** (free)
2. **Open** `taco-birria-animation.mp4`
3. **Set**:
   - Codec: H.265
   - Bitrate: 800 Kbps
   - Resolution: 480p
4. **Export** as `taco-birria-animation.mp4`
5. **Replace** old file in `/public`
6. **Done!** ✨

**No code changes needed** if you just replace the file. The `preload="metadata"` already added will help it load faster.

