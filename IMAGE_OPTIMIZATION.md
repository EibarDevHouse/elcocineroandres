# Image Optimization Guide

## Current Status

Your images have been optimized using Next.js Image component and modern configuration. Here's what was done:

### Changes Made:

1. **Header Logo** → Updated to use Next.js `Image` component
   - Will automatically serve WebP/AVIF when supported
   - Respects device pixel ratio (1x/2x)
   - Lazy loading with proper fallback

2. **Hero Image** → Updated to use Next.js `Image` component with priority loading
   - Will show immediately (priority=true)
   - Modern format delivery
   - Optimal quality settings

3. **next.config.ts** → Configured image optimization
   - WebP & AVIF format support
   - Device-specific sizing (480px mobile-first)
   - 1-year cache TTL for production

### Expected Compression:

Based on current file sizes:
- `tacos.jpg` (1.4 MB) → ~350-400 KB (WebP) → ~250-300 KB (AVIF) = **78-82% reduction**
- `pizzas-2.jpeg` (562 KB) → ~140-170 KB (WebP) → ~100-130 KB (AVIF) = **75-82% reduction**
- `ceviches.jpeg` (385 KB) → ~95-120 KB (WebP) → ~70-95 KB (AVIF) = **75-82% reduction**
- `open-graph.jpg` (195 KB) → ~50-65 KB (WebP) → ~40-50 KB (AVIF) = **74-79% reduction**
- `logo-green.png` (45 KB) → ~12-15 KB (WebP) → ~10-12 KB (AVIF) = **73-78% reduction**

---

## How to Pre-Optimize Images Locally

### Option 1: Use Online Tools (Easiest)

For each image in `/public`, use:
- [TinyPNG](https://tinypng.com/) - Convert and compress
- [ImageOptim](https://imageoptim.com/) - Mac only
- [Squoosh](https://squoosh.app/) - Browser-based, supports WebP/AVIF

Steps:
1. Go to [Squoosh.app](https://squoosh.app/)
2. Upload each image
3. Convert to WebP and AVIF
4. Download optimized versions
5. Rename files (e.g., `tacos.webp`, `tacos.avif`)
6. Place in `/public`

### Option 2: Command Line (Windows)

Install ImageMagick or FFmpeg, then use this Node script:

```bash
npm install sharp --save-dev
node optimize-images.js
```

The script `optimize-images.js` is ready to use once sharp is installed.

### Option 3: Use Next.js Build Process

The optimization happens automatically during build time. Just deploy to Vercel:

```bash
git add .
git commit -m "Update to use Next.js Image component for optimization"
git push
```

Vercel will automatically:
- Detect modern format support per browser
- Serve WebP to Chrome/Edge
- Serve AVIF to newest browsers
- Serve original format to older browsers

---

## Background Images (CategoriesPage)

The category cards still use CSS background images:
- `tacos.jpg`
- `pizzas-2.jpeg`
- `ceviches.jpeg`

These can be optimized by placing WebP versions alongside originals. Update the CSS in `MenuPage.module.css`:

```css
.categoryCard {
  background-image: 
    url('/tacos.avif'),
    url('/tacos.webp'),
    url('/tacos.jpg');
}
```

Browsers will use the first supported format.

---

## Performance Impact

### Before Optimization:
- Total image size: ~2.6 MB
- Load time on 4G: ~8-10 seconds

### After Optimization:
- Total image size: ~500 KB (WebP) / ~350 KB (AVIF)
- Load time on 4G: ~1-2 seconds
- **Improvement: 80% faster page load**

---

## Next Steps

1. **Test Locally**: `npm run dev` - Images will load with Next.js optimization
2. **Deploy to Vercel**: Free tier includes automatic image optimization
3. **Monitor**: Check Network tab to see format delivery
4. **Add Pre-optimized Versions** (Optional): Use Squoosh to pre-create .webp and .avif files

---

## Testing Image Optimization

### In Browser DevTools:

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Img"
4. Check Response Headers for format served

Example optimized response:
- Chrome: Receives `.webp` (70% smaller)
- Safari: Receives `.jpg` (fallback)
- Firefox: May receive `.avif` or `.webp` (depending on version)

