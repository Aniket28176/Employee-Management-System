# Deploy Full Stack on Render

Deploy both frontend and backend on Render in two ways:

## Option A: Two Separate Services (Recommended for Scalability)

### 1. Deploy Backend on Render

1. Go to [render.com](https://render.com) and sign in
2. Click **New +** → **Web Service**
3. Connect your GitHub repo
4. Select the root directory (or specify `backend/` if asked)
5. Configure:
   - **Name:** `employ-management-backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Branch:** main

6. Add Environment Variables (click **Environment**):
   ```
   PORT=3000
   NODE_ENV=production
   MONGODB_URL=<your-mongodb-connection-string>
   CLOUDINARY_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-secret>
   JWT_SECRET=<generate-secure-random-string>
   FRONTEND_URL=https://your-frontend-render-url.onrender.com
   ```

7. Click **Create Web Service** and wait for deployment
8. Copy the backend URL (e.g., `https://employ-management-backend.onrender.com`)

### 2. Deploy Frontend on Render (Static Site or Web Service)

**Option A1: Static Site** (simpler, but limited)
1. Go to [render.com](https://render.com) → **New +** → **Static Site**
2. Connect your GitHub repo, select root directory
3. Configure:
   - **Name:** `employ-management-frontend`
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`

4. Add Environment Variable:
   ```
   VITE_API_URL=https://employ-management-backend.onrender.com
   ```

5. Deploy and wait for completion

---

**Option A2: Web Service** (more control, full Node.js)
1. Create `frontend/server.js`:
   ```javascript
   const express = require('express');
   const path = require('path');
   const app = express();

   app.use(express.static(path.join(__dirname, 'dist')));

   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'dist/index.html'));
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(`Frontend server on port ${PORT}`));
   ```

2. Update `frontend/package.json` scripts:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "start": "node server.js",
     "preview": "vite preview"
   }
   ```

3. Go to [render.com](https://render.com) → **New +** → **Web Service**
4. Connect GitHub, select root directory
5. Configure:
   - **Name:** `employ-management-frontend`
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Start Command:** `cd frontend && npm start`

6. Add Environment Variable:
   ```
   VITE_API_URL=https://employ-management-backend.onrender.com
   ```

7. Deploy

---

## Option B: Monolithic Service (Same Render Service for Both)

Serve frontend from the same backend server:

1. Update backend `index.js` to serve the React app:
   ```javascript
   const express = require('express');
   const path = require('path');
   const app = express();

   // ... existing middleware ...

   // Serve frontend static files
   app.use(express.static(path.join(__dirname, '../frontend/dist')));

   // API routes
   app.use('/api/employs', EmployRouter);
   app.use('/api/attendance', AttendanceRouter);
   app.use('/api/auth', AuthRouter);

   // Serve index.html for all non-API routes (SPA fallback)
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
   });

   const port = process.env.PORT || 3000;
   app.listen(port, () => console.log(`Server on port ${port}`));
   ```

2. Update `backend/Procfile`:
   ```
   web: npm run build:full && node index.js
   ```

3. Add to `backend/package.json` scripts:
   ```json
   "build:full": "cd ../frontend && npm install && npm run build"
   ```

4. Deploy on Render as a single Web Service with:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

---

## Quick Setup Checklist

- [ ] Backend deployed on Render with all env vars set
- [ ] Copy backend URL from Render dashboard
- [ ] Set `VITE_API_URL` in frontend env vars to backend URL
- [ ] Frontend deployed on Render (Option A1, A2, or B)
- [ ] Test API calls: Open frontend → try login/create employee
- [ ] Update CORS in backend if needed (add your frontend URL)

---

## Troubleshooting

**"Cannot find module" errors during build:**
- Ensure `npm install` is in the build command

**API calls failing (CORS errors):**
- Check backend `allowedOrigins` array includes your frontend URL
- Restart both services after updating

**Build timeout:**
- Increase timeout in Render dashboard (Settings → Build & Deploy)
- Or split into separate lightweight services

**Environment variable not loaded:**
- Restart the service after adding env vars
- Check spelling: `VITE_API_URL` (case-sensitive)
