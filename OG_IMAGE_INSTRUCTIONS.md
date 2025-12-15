# OG Image Creation Instructions

## Overview
The Open Graph (OG) image is used when your portfolio is shared on social media platforms like Twitter, Facebook, LinkedIn, etc.

## Requirements

### Dimensions
- **Size:** 1200 x 630 pixels
- **Aspect Ratio:** 1.91:1
- **Format:** JPG or PNG
- **File Size:** Under 1MB (recommended: 200-500KB)

### Content Suggestions

1. **Portfolio Title**
   - "Orv - Full-Stack Developer"
   - Large, readable font

2. **Tagline**
   - "Cybersecurity, AI & Telegram Bot Developer"
   - Smaller subtitle

3. **Visual Elements**
   - Dark theme (matches portfolio)
   - Gradient background (blue/indigo/purple)
   - Terminal/code aesthetic
   - Optional: Profile picture or logo

4. **Design Tips**
   - Keep text large and readable
   - Use high contrast
   - Include brand colors (blue, indigo, purple)
   - Keep it simple and professional

## Tools

### Online Tools
- [Canva](https://www.canva.com) - Free, easy to use
- [Figma](https://www.figma.com) - Professional design tool
- [Bannerbear](https://www.bannerbear.com) - Automated OG image generation

### Design Templates
- Search for "OG Image Template" on Canva
- Use "Open Graph Image Generator" tools

## File Placement

Once created, place the image in the `public/` folder:

```
public/
  └── og-image.jpg  (or og-image.png)
```

## Verification

After adding the image, verify it works:

1. **Facebook Debugger:**
   - https://developers.facebook.com/tools/debug/
   - Enter your URL and click "Scrape Again"

2. **Twitter Card Validator:**
   - https://cards-dev.twitter.com/validator

3. **LinkedIn Post Inspector:**
   - https://www.linkedin.com/post-inspector/

## Quick Template (Canva)

1. Create new design: 1200 x 630px
2. Background: Dark gradient (slate-950 to blue-600)
3. Add text:
   - Title: "ORV" (large, bold, white)
   - Subtitle: "Full-Stack Developer" (medium, slate-300)
   - Tagline: "Cybersecurity • AI • Telegram Bots" (small, slate-400)
4. Add decorative elements (optional):
   - Terminal window frame
   - Code brackets {}
   - Gradient lines
5. Export as JPG (high quality, optimized)

## Example Design

```
┌─────────────────────────────────────────┐
│                                         │
│         [Terminal Window Frame]         │
│                                         │
│              ORV                        │
│      Full-Stack Developer               │
│                                         │
│  Cybersecurity • AI • Telegram Bots    │
│                                         │
│         [Decorative Elements]            │
│                                         │
└─────────────────────────────────────────┘
```

## Current Status

⚠️ **OG Image Missing**
- File referenced in `index.html` but not created
- Social sharing will work but without preview image
- **Action Required:** Create and add `og-image.jpg` to `public/` folder

---

**Note:** The image is already referenced in `index.html` at lines 24 and 33. Once you create the image, it will automatically be used for social sharing.

