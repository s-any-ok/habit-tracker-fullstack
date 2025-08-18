# 🚀 Deployment Guide

Step-by-step guide to deploy the Habit Tracker to production.

## 🎯 Deployment Stack

- **Frontend**: Vercel (Free)
- **Backend**: Railway ($5/month)
- **Database**: Supabase (Free tier)

## 📋 Prerequisites

1. GitHub account
2. Google Cloud Console project with OAuth setup
3. Accounts on: Vercel, Railway, Supabase

## 🗄️ Step 1: Database Setup (Supabase)

1. Go to [supabase.com](https://supabase.com)
2. Sign in with GitHub
3. Create new project:
   - **Name**: `habit-tracker-db`
   - **Database Password**: Generate strong password
   - **Region**: Choose closest to your users
4. Wait for database creation (~2 minutes)
5. Go to **Settings** → **Database**
6. Copy connection details:
   ```
   Host: db.xxx.supabase.co
   Database: postgres
   Port: 5432
   User: postgres
   Password: [your-password]
   ```

## 🖥️ Step 2: Backend Deployment (Railway)

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your `habit-tracker-fullstack` repository
5. Choose **backend** folder as root directory
6. Configure environment variables:

   **Click "Variables" tab and add:**

   ```bash
   DATABASE_HOST=db.xxx.supabase.co
   DATABASE_PORT=5432
   DATABASE_NAME=postgres
   DATABASE_USER=postgres
   DATABASE_PASSWORD=your-supabase-password

   JWT_SECRET=your-super-secret-jwt-key-min-32-chars

   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   PORT=3001
   FRONTEND_URL=https://your-app.vercel.app
   ```

7. **Deploy**: Railway will automatically build and deploy
8. Copy your backend URL: `https://your-app.up.railway.app`

## 🌐 Step 3: Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Import your `habit-tracker-fullstack` repository
5. Configure build settings:

   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

6. Add environment variable:

   ```bash
   REACT_APP_API_URL=https://your-app.up.railway.app
   ```

7. **Deploy**: Vercel will build and deploy
8. Your app will be live at: `https://your-app.vercel.app`

## 🔧 Step 4: Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Update **Authorized JavaScript origins**:
   ```
   https://your-app.vercel.app
   https://your-app.up.railway.app
   ```
5. Update **Authorized redirect URIs**:
   ```
   https://your-app.up.railway.app/auth/google/callback
   ```

## 🔄 Step 5: Update Environment Variables

**Railway (Backend):**
Update `FRONTEND_URL` to your Vercel URL:

```bash
FRONTEND_URL=https://your-app.vercel.app
```

**Vercel (Frontend):**
Update `REACT_APP_API_URL` to your Railway URL:

```bash
REACT_APP_API_URL=https://your-app.up.railway.app
```

## ✅ Step 6: Test Deployment

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Click "Sign in with Google"
3. Complete OAuth flow
4. Create a test habit
5. Mark it as completed

## 🔄 Continuous Deployment

Both platforms support automatic deployment:

**Vercel:**

- Automatically deploys on push to `main` branch
- Preview deployments for pull requests

**Railway:**

- Automatically deploys on push to `main` branch
- Environment variables persist across deployments

## 💰 Cost Breakdown

- **Vercel**: Free (100GB bandwidth)
- **Railway**: $5/month (backend hosting)
- **Supabase**: Free (500MB database, 50,000 requests/month)

**Total: $5/month**

## 🐛 Troubleshooting

**Backend won't start on Railway:**

- Check environment variables are set correctly
- Verify DATABASE_URL format
- Check Railway logs for errors

**Frontend can't connect to backend:**

- Verify REACT_APP_API_URL is correct
- Check CORS settings in backend
- Ensure Railway backend is running

**Google OAuth fails:**

- Verify redirect URIs in Google Console
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Ensure FRONTEND_URL matches Vercel domain

**Database connection issues:**

- Verify Supabase connection details
- Check if IP restrictions are enabled
- Test connection from Railway logs

## 🔧 Advanced Configuration

### Custom Domain (Optional)

**Vercel:**

1. Go to project settings
2. Add custom domain
3. Configure DNS records

**Railway:**

1. Go to project settings
2. Add custom domain
3. Update FRONTEND_URL environment variable

### SSL Certificates

Both Vercel and Railway provide automatic SSL certificates.

### Monitoring

- **Railway**: Built-in metrics and logs
- **Vercel**: Analytics and Web Vitals
- **Supabase**: Database metrics and logs

## 🚀 Production Checklist

- [ ] Supabase database created and configured
- [ ] Railway backend deployed with all environment variables
- [ ] Vercel frontend deployed with correct API URL
- [ ] Google OAuth configured with production URLs
- [ ] Test complete user flow (login → create habit → mark complete)
- [ ] Check all environment variables are production-ready
- [ ] Verify CORS settings allow production domains
- [ ] Test on mobile devices
- [ ] Monitor application logs for errors

Your Habit Tracker is now live and ready for users! 🎉
