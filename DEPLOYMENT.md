# Environment Variables for Deployment

## Backend (Render.com)

Set these environment variables in Render dashboard:

- `PORT` — Server port (default: 5882, Render will override)
- `NODE_ENV` — Set to `production`
- `MONGODB_URL` — MongoDB connection string
- `CLOUDINARY_NAME` — Cloudinary account name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `JWT_SECRET` — Secret key for JWT signing (generate a strong random string)

### Example secure JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Frontend (Vercel)

Create `.env.production` (or configure in Vercel dashboard):

- `VITE_API_URL` — Backend API URL (e.g., `https://your-backend.onrender.com`)

For local development, create `.env.local`:
```
VITE_API_URL=http://localhost:5882
```

## Deployment Steps

### Backend (Render)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create New > Web Service
4. Connect GitHub repo (select backend folder)
5. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add all vars from above
6. Deploy

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import Project > Select frontend folder
4. Configure:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:** Add `VITE_API_URL` pointing to Render backend
5. Deploy

After deployment, update frontend `VITE_API_URL` in Vercel env vars to match the actual Render backend URL.
