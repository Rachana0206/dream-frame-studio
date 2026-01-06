# GitHub Setup Guide

Your project is now ready to be pushed to GitHub!

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `dream-frame-studio` (or any name you prefer)
4. Description: "Dream Frame Studio - Professional Photography & Videography Studio Web App"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see instructions. Run these commands:

```bash
cd d:\Dreamframestudio
git remote add origin https://github.com/YOUR_USERNAME/dream-frame-studio.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

## Step 3: Verify

1. Go to your GitHub repository page
2. You should see all your files there
3. The README.md will display automatically

## Future Updates

Whenever you make changes, use these commands:

```bash
git add .
git commit -m "Description of your changes"
git push
```

## Important Notes

- The `.gitignore` file ensures sensitive files are NOT uploaded:
  - `bookings.db` (database file)
  - `.env` (environment variables with passwords)
  - `node_modules/` (dependencies)

- **Never commit sensitive information** like:
  - Email passwords (SMTP_PASS)
  - API keys
  - Database credentials

## Troubleshooting

If you get authentication errors:
- Use GitHub Personal Access Token instead of password
- Or use GitHub Desktop app for easier management

---

**Your project is ready for GitHub! 🚀**

