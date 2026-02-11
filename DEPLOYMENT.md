# Deployment Guide

This guide will help you deploy the Food Inventory Management System to production.

## Architecture
- **Frontend**: Next.js app deployed on Vercel
- **Backend**: FastAPI app deployed on Render
- **Database**: SQLite (for demo) - can be upgraded to PostgreSQL for production

## Prerequisites
- GitHub account
- Vercel account (free tier available)
- Render account (free tier available)

## Step 1: Prepare Your Repository

### Option A: Single Repository (Recommended)
Keep both frontend and backend in the same repository with this structure:
```
food-inventory-system/
├── frontend/          # Next.js app
├── backend/           # FastAPI app
├── README.md
└── DEPLOYMENT.md
```

### Option B: Separate Repositories
Create two separate repositories:
- `food-inventory-frontend`
- `food-inventory-backend`

## Step 2: Deploy Backend to Render

1. **Push your code to GitHub**
2. **Go to Render Dashboard** (https://render.com)
3. **Create New Web Service**
   - Connect your GitHub repository
   - Select the repository
   - Configure settings:
     - **Name**: `food-inventory-backend`
     - **Environment**: `Python 3`
     - **Region**: Choose closest to your users
     - **Branch**: `main`
     - **Root Directory**: `backend` (if using single repo)
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables** (Optional):
   - `ENVIRONMENT`: `production`
   - `DATABASE_URL`: `sqlite:///./food_inventory.db` (or PostgreSQL URL)

5. **Deploy**: Click "Create Web Service"

Your backend will be available at: `https://your-service-name.onrender.com`

## Step 3: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard** (https://vercel.com)
2. **Import Project**
   - Connect your GitHub repository
   - Select the repository
   - Configure settings:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend` (if using single repo)
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

3. **Environment Variables**:
   - `NEXT_PUBLIC_FOOD_API_URL`: `https://your-backend-service.onrender.com`

4. **Deploy**: Click "Deploy"

Your frontend will be available at: `https://your-app-name.vercel.app`

## Step 4: Update CORS Configuration

After deployment, update the CORS configuration in `backend/app/main.py`:

```python
allowed_origins = [
    "https://your-app-name.vercel.app",  # Your actual Vercel domain
]
```

Redeploy the backend after this change.

## Step 5: Initialize Database (One-time)

After backend deployment, initialize the database with sample data:

1. Go to your Render service dashboard
2. Open the "Shell" tab
3. Run: `python seed_data.py`

## Production Considerations

### Database
- **Current**: SQLite (file-based, good for demo)
- **Recommended for Production**: PostgreSQL
  - Render offers free PostgreSQL databases
  - Update `DATABASE_URL` environment variable

### Security
- Use environment variables for sensitive data
- Implement proper authentication/authorization
- Use HTTPS only (both platforms provide this by default)

### Monitoring
- Enable logging in both Render and Vercel
- Set up health checks
- Monitor API performance

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is in backend's allowed_origins
   - Check environment variables are set correctly

2. **API Connection Issues**
   - Verify NEXT_PUBLIC_FOOD_API_URL is correct
   - Check backend service is running on Render

3. **Database Issues**
   - Ensure database tables are created (automatic on first run)
   - Check if seed data is needed

### Logs
- **Backend logs**: Render dashboard → Your service → Logs
- **Frontend logs**: Vercel dashboard → Your project → Functions

## Cost Estimation

### Free Tier Limits
- **Render**: 750 hours/month (enough for 24/7 operation)
- **Vercel**: 100GB bandwidth, 6000 serverless function executions

### Paid Tiers (if needed)
- **Render**: $7/month for always-on service
- **Vercel**: $20/month for Pro features

## Next Steps After Deployment

1. **Custom Domain**: Add your own domain in Vercel settings
2. **SSL Certificate**: Automatic with both platforms
3. **Database Backup**: Set up regular backups if using PostgreSQL
4. **Monitoring**: Set up uptime monitoring
5. **CI/CD**: Both platforms auto-deploy on git push

## Support

If you encounter issues:
1. Check the logs in respective dashboards
2. Verify environment variables
3. Test API endpoints directly
4. Check CORS configuration