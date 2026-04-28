# Deployment Guide

Complete guide for deploying the Portfolio Builder Platform to production.

## 📋 Prerequisites

- MongoDB Atlas account (or MongoDB hosting)
- Vercel/Netlify account (for frontend)
- Railway/Render/Heroku account (for backend)
- Domain name (optional)

---

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0)
5. Select your cloud provider and region
6. Click **"Create Cluster"**

### 2. Configure Database Access

1. Go to **Database Access** → **Add New Database User**
2. Create username and password
3. Set **Authentication Method**: Password
4. Grant **Read and Write** privileges
5. Click **"Add User"**

### 3. Configure Network Access

1. Go to **Network Access** → **Add IP Address**
2. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - *Note: For production, restrict to specific IPs*
3. Click **"Confirm"**

### 4. Get Connection String

1. Go to **Database** → **Connect**
2. Choose **"Connect your application"**
3. Copy connection string:
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/
   ```
4. Replace `<password>` with your database password
5. Add database name at the end: `/portfolio-builder`

---

## 🚀 Backend Deployment (Railway)

### Using Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd server
   railway init
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set PORT=5000
   railway variables set MONGODB_URI="your_mongodb_atlas_uri"
   railway variables set JWT_SECRET="your_secure_secret_key"
   railway variables set JWT_EXPIRE="7d"
   railway variables set NODE_ENV="production"
   railway variables set CLIENT_URL="https://your-frontend-domain.com"
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Get Backend URL**
   - Go to Railway dashboard
   - Click on your project
   - Copy the generated URL (e.g., `https://yourapp.railway.app`)

### Alternative: Deploy to Render

1. Go to [Render](https://render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: portfolio-builder-api
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables (same as above)
6. Click **"Create Web Service"**

---

## 💻 Frontend Deployment (Vercel)

### Using Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to Client**
   ```bash
   cd client
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Set Environment Variable**
   ```bash
   vercel env add VITE_API_URL
   # Enter your backend URL: https://yourapp.railway.app/api
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Build the App**
   ```bash
   cd client
   npm run build
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

5. **Set Environment Variable**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://yourapp.railway.app/api`

---

## 🌐 Custom Domain Setup

### For Backend (Railway)

1. Go to Railway dashboard → Your project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain: `api.yourdomain.com`
5. Update DNS records at your domain registrar:
   ```
   Type: CNAME
   Name: api
   Value: [provided by Railway]
   ```

### For Frontend (Vercel)

1. Go to Vercel dashboard → Your project
2. Click **"Settings"** → **"Domains"**
3. Add your domain: `yourdomain.com` and `www.yourdomain.com`
4. Update DNS records:
   ```
   Type: A
   Name: @
   Value: [Vercel IP]

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 🔐 Security Checklist

### Backend Security

- [x] Use strong JWT_SECRET (min 32 random characters)
- [x] Enable CORS only for your frontend domain
- [x] Use HTTPS for all connections
- [x] Restrict MongoDB access to specific IPs
- [x] Enable MongoDB authentication
- [x] Use environment variables for secrets
- [x] Rate limiting (add express-rate-limit)
- [x] Input validation
- [x] Helmet.js security headers

### Frontend Security

- [x] Use HTTPS
- [x] Store tokens in localStorage (or consider httpOnly cookies)
- [x] Validate all user inputs
- [x] Sanitize displayed content
- [x] Use Content Security Policy headers

---

## 📊 Production Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio-builder
JWT_SECRET=generate_with_openssl_rand_base64_32
JWT_EXPIRE=7d
NODE_ENV=production
CLIENT_URL=https://yourdomain.com
```

### Frontend (.env)

```env
VITE_API_URL=https://api.yourdomain.com/api
```

---

## 🧪 Post-Deployment Testing

### Backend Health Check

```bash
curl https://your-backend-url.com/api/health
```

### Frontend Testing

1. Visit: `https://your-frontend-url.com`
2. Test user registration
3. Test login
4. Create a portfolio
5. Test canvas editor
6. Publish portfolio
7. View public portfolio

### API Endpoint Testing

```bash
# Register
curl -X POST https://api.yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","fullName":"Test User"}'

# Login
curl -X POST https://api.yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 📈 Monitoring & Maintenance

### Add Logging

**Backend:**
```javascript
// Add to server.js
const morgan = require('morgan');
app.use(morgan('combined'));
```

### Error Tracking

Consider integrating:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **New Relic** for performance monitoring

### Database Backups

**MongoDB Atlas:**
- Go to **Backup** tab
- Enable **Continuous Backup**
- Set backup schedule
- Test restore process

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions for Automatic Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          cd client && vercel --token ${{ secrets.VERCEL_TOKEN }} --prod
```

---

## 🐛 Troubleshooting

### Backend Not Connecting to MongoDB

1. Check MongoDB Atlas IP whitelist
2. Verify connection string format
3. Check database user permissions
4. View Railway/Render logs

### CORS Errors

1. Ensure `CLIENT_URL` matches your frontend domain
2. Include protocol (https://)
3. No trailing slash in URL

### 502 Bad Gateway

1. Check backend is running
2. Verify environment variables are set
3. Check backend logs for errors

### Frontend Can't Reach Backend

1. Verify `VITE_API_URL` is correct
2. Check CORS configuration
3. Test API endpoint directly
4. Check browser console for errors

---

## 📞 Support

If you encounter issues:

1. Check the [Troubleshooting Guide](./README.md#troubleshooting)
2. Review Railway/Vercel logs
3. Search existing GitHub issues
4. Create a new issue with:
   - Deployment platform
   - Error messages
   - Environment (production/staging)
   - Steps to reproduce

---

## ✅ Deployment Checklist

Before going live:

- [ ] MongoDB Atlas configured with backups
- [ ] Backend deployed with all environment variables
- [ ] Frontend deployed and pointing to backend
- [ ] Custom domains configured (optional)
- [ ] SSL certificates active
- [ ] CORS properly configured
- [ ] Test all critical user flows
- [ ] Error tracking setup
- [ ] Monitoring dashboards configured
- [ ] Database backup verified
- [ ] Security checklist completed
- [ ] Performance testing done
- [ ] Documentation updated

---

🎉 **Congratulations!** Your Portfolio Builder Platform is now live!

Share your deployment at: `https://yourdomain.com`
