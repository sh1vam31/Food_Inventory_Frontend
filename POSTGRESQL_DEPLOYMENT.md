# PostgreSQL Deployment Guide

This guide covers deploying your Food Inventory Management System with PostgreSQL on Render.

## 🗄️ Database Architecture

- **Development**: SQLite (local file)
- **Production**: PostgreSQL (Render managed database)
- **Migration**: Automatic table creation + optional data migration

## 🚀 Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Add PostgreSQL support for production"
git push origin main
```

### 2. Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `food-inventory-db`
   - **Database**: `food_inventory`
   - **User**: `food_inventory_user`
   - **Region**: Same as your web service
   - **Plan**: Free (or paid for production)

4. **Save the connection details** (you'll need them)

### 3. Deploy Backend Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `food-inventory-backend`
   - **Environment**: `Python 3`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables**:
   - `ENVIRONMENT`: `production`
   - `DATABASE_URL`: Connect to your PostgreSQL database
     - Click "Add from Database" → Select your PostgreSQL database

5. **Deploy**

### 4. Initialize Database

After deployment, your backend will automatically:
- ✅ Create all database tables
- ✅ Set up relationships and indexes

To add sample data:
1. Go to your Render service dashboard
2. Open the "Shell" tab
3. Run: `python seed_data.py`

### 5. Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     - `NEXT_PUBLIC_FOOD_API_URL`: `https://your-backend-service.onrender.com`

### 6. Update CORS Settings

After getting your Vercel URL, update `backend/app/main.py`:

```python
allowed_origins = [
    "https://your-actual-vercel-app.vercel.app",
]
```

Commit and push to trigger redeployment.

## 🔄 Data Migration (Optional)

If you have existing SQLite data to migrate:

### Local Migration
```bash
cd backend
python migrate_to_postgresql.py "postgresql://user:password@host:port/database"
```

### Production Migration
1. Download your SQLite database from development
2. Use the migration script with your Render PostgreSQL URL
3. Or manually recreate important data using the admin interface

## 🔧 Database Configuration Details

### Connection Settings
- **Pool Size**: Optimized for Render's resources
- **Connection Recycling**: 5-minute intervals
- **Health Checks**: Automatic connection validation

### Performance Features
- **Connection Pooling**: Efficient connection reuse
- **Query Optimization**: Proper indexes on foreign keys
- **Transaction Management**: ACID compliance for inventory operations

## 📊 Monitoring & Maintenance

### Database Monitoring
- **Render Dashboard**: View connection stats, query performance
- **Health Endpoint**: `GET /health` shows database type and status
- **Logs**: Monitor connection issues and query performance

### Backup Strategy
- **Render Automatic Backups**: Daily backups on paid plans
- **Manual Backups**: Use `pg_dump` for custom backups
- **Data Export**: API endpoints for data export

## 🔍 Troubleshooting

### Common Issues

1. **Connection Errors**
   ```
   Check DATABASE_URL format: postgresql://user:password@host:port/database
   Verify database service is running
   Check network connectivity
   ```

2. **Migration Issues**
   ```
   Ensure tables are created: Check /health endpoint
   Verify data types compatibility
   Check foreign key constraints
   ```

3. **Performance Issues**
   ```
   Monitor connection pool usage
   Check query execution plans
   Optimize database indexes
   ```

### Debug Commands

```bash
# Check database connection
curl https://your-backend.onrender.com/health

# View database info
curl https://your-backend.onrender.com/

# Test API endpoints
curl https://your-backend.onrender.com/api/raw-materials/
```

## 💰 Cost Breakdown

### Free Tier
- **PostgreSQL**: 1GB storage, 1 month retention
- **Web Service**: 750 hours/month
- **Total**: $0/month

### Production Tier
- **PostgreSQL**: $7/month (25GB storage, 7-day retention)
- **Web Service**: $7/month (always-on)
- **Total**: $14/month

## 🚀 Production Optimizations

### Database Optimizations
- **Indexes**: Automatic on foreign keys and frequently queried columns
- **Connection Pooling**: Configured for optimal performance
- **Query Optimization**: Efficient joins and relationships

### Application Optimizations
- **Environment Detection**: Automatic SQLite/PostgreSQL switching
- **Error Handling**: Robust database error handling
- **Health Checks**: Comprehensive system monitoring

## 🔐 Security Features

- **Connection Encryption**: SSL/TLS for all database connections
- **Environment Variables**: Secure credential management
- **Access Control**: Database user with minimal required permissions
- **Network Security**: Private database networking on Render

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend health check shows PostgreSQL
- [ ] All API endpoints work correctly
- [ ] Frontend can connect to backend
- [ ] Database tables are created
- [ ] Sample data loads successfully
- [ ] Order processing works (critical test)
- [ ] Inventory deduction functions properly

## 📞 Support

If you encounter issues:
1. Check Render service logs
2. Verify environment variables
3. Test database connectivity
4. Review PostgreSQL connection limits

Your Food Inventory Management System is now running on production-grade PostgreSQL! 🎉