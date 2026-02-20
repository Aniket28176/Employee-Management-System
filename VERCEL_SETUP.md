# Vercel Deployment Guide

## Frontend Setup on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import from GitHub → Select your repo → **Frontend folder**
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:**
     - Name: `VITE_API_URL`
     - Value: `https://employee-management-system-e6ko.onrender.com`
5. Click **Deploy**

## After Deployment

Once Vercel deploys, you'll get a live URL like:
```
https://employee-management-system.vercel.app
```

Add this to Render backend environment variables:
- Go to Render dashboard → Your backend service
- **Environment** → Add/Update:
  - `FRONTEND_URL=https://employee-management-system.vercel.app`
- Save & restart service

## Backend CORS Settings

Already configured to allow:
- ✅ `https://employee-management-system.vercel.app` (Vercel frontend)
- ✅ `http://localhost:3000` (local frontend)
- ✅ `http://localhost:5173` (Vite dev server)
- ✅ Environment variable `FRONTEND_URL` (Render)

## Testing

After both deployments are live:

1. Visit: `https://employee-management-system.vercel.app`
2. Signup → Create Admin account
3. Login → You should see employees list
4. Admin users can access Attendance page

## Troubleshooting

**"Failed to fetch" errors:**
- Check Vercel env var `VITE_API_URL` matches Render backend URL
- Check Render backend is running (check logs)
- Verify CORS is allowing Vercel domain

**Build fails on Vercel:**
- Ensure `package.json` has `build` script
- Check `node_modules` is not in git (should be in `.gitignore`)
