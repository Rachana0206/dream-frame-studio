# How to Add Instagram Photos to Your Portfolio

## Quick Method: Get Instagram Image URLs

### Method 1: Direct Image URL (Easiest)
1. Go to your Instagram post: https://www.instagram.com/_dream_frame_studio/
2. Right-click on the photo you want to use
3. Select "Copy image address" or "Copy image URL"
4. Paste the URL into the `server.js` file (see below)

### Method 2: Using Browser Developer Tools
1. Open your Instagram post in a web browser
2. Press `F12` to open Developer Tools
3. Go to the "Network" tab
4. Refresh the page
5. Look for image files (usually `.jpg` files)
6. Right-click on the image > Copy > Copy link address
7. Use that URL

### Method 3: Instagram Post URL Format
If you know the post ID, you can use:
```
https://www.instagram.com/p/POST_ID/media/?size=l
```

## How to Add Images to Your Website

1. Open `server.js` file
2. Find the `/api/instagram` endpoint (around line 60)
3. Add your image URLs in the `instagramImages` array:

```javascript
const instagramImages = [
  {
    url: 'https://scontent.cdninstagram.com/v/...', // Your Instagram image URL
    category: 'wedding', // Options: 'wedding', 'portrait', 'event', 'commercial'
    title: 'Wedding Celebration',
    description: 'Beautiful outdoor wedding'
  },
  {
    url: 'https://scontent.cdninstagram.com/v/...',
    category: 'portrait',
    title: 'Family Portrait',
    description: 'Family session'
  },
  // Add more images...
];
```

## Categories Available
- `wedding` - Wedding Photography
- `portrait` - Portrait Sessions
- `event` - Event Photography
- `commercial` - Commercial Photography

## Example Configuration

```javascript
const instagramImages = [
  {
    url: 'https://scontent.cdninstagram.com/v/t51.2885-15/1234567890_1234567890_n.jpg',
    category: 'wedding',
    title: 'Wedding Ceremony',
    description: 'Elegant outdoor wedding'
  },
  {
    url: 'https://scontent.cdninstagram.com/v/t51.2885-15/0987654321_0987654321_n.jpg',
    category: 'portrait',
    title: 'Family Portrait',
    description: 'Family session'
  }
];
```

## After Adding Images

1. Save the `server.js` file
2. Restart your server: `npm start`
3. Refresh your website
4. Your Instagram photos will appear in the portfolio!

## Notes

- Instagram image URLs may expire after some time
- For permanent solution, consider downloading images and hosting them yourself
- Or use Instagram's official API (requires authentication setup)

## Alternative: Download and Host Images

1. Download your Instagram photos
2. Save them in a `public/images/portfolio/` folder
3. Use local paths like `/images/portfolio/photo1.jpg` instead of Instagram URLs



