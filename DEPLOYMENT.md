# 🚀 ProductDecoded Deployment Guide

## Architecture Overview
- **Frontend**: Vercel (Static hosting)
- **Backend**: Render (Node.js server)
- **Database**: MongoDB Atlas
- **Authentication**: Clerk

---

## 📋 Pre-Deployment Checklist

### ✅ **Backend (Render)**
1. **Environment Variables** to set in Render:
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://your-atlas-connection-string
   CLERK_SECRET_KEY=sk_your_clerk_secret_key
   PORT=5000
   ```

2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Auto-Deploy**: Connect your GitHub repo

### ✅ **Frontend (Vercel)**
1. **Environment Variables** to set in Vercel:
   ```bash
   VITE_CLERK_PUBLISHABLE_KEY=pk_your_clerk_publishable_key
   VITE_OPENAI_API_KEY=sk_your_openai_api_key
   VITE_API_BASE_URL=https://your-render-app.onrender.com/api
   VITE_ENVIRONMENT=production
   ```

2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Install Command**: `npm install`

---

## 🔧 **Step-by-Step Deployment**

### **1. Deploy Backend to Render**

1. **Create Render Account**: Go to [render.com](https://render.com)

2. **Create Web Service**:
   - Connect your GitHub repo
   - Select the `server` folder as root directory
   - Set environment: `Node`
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Add Environment Variables**:
   ```bash
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   CLERK_SECRET_KEY=your_clerk_secret_key
   PORT=5000
   ```

4. **Deploy & Get URL**: Your app will be available at:
   ```
   https://your-app-name.onrender.com
   ```

### **2. Deploy Frontend to Vercel**

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com)

2. **Import Project**:
   - Connect your GitHub repo
   - Select the `client` folder as root directory
   - Framework preset: `Vite`

3. **Add Environment Variables**:
   ```bash
   VITE_CLERK_PUBLISHABLE_KEY=pk_your_clerk_publishable_key
   VITE_OPENAI_API_KEY=sk_your_openai_api_key
   VITE_API_BASE_URL=https://your-render-app.onrender.com/api
   VITE_ENVIRONMENT=production
   ```

4. **Deploy**: Your app will be available at:
   ```
   https://your-app.vercel.app
   ```

---

## 🔗 **3. Configure Webhooks (IMPORTANT)**

### **Clerk Webhook Setup**
1. Go to **Clerk Dashboard** → **Webhooks**

2. **Replace localhost webhook** with your Render URL:
   ```bash
   # ❌ Remove this:
   http://localhost:5000/api/webhooks/clerk
   
   # ✅ Use this instead:
   https://your-render-app.onrender.com/api/webhooks/clerk
   ```

3. **Subscribe to Events**:
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`

4. **Test Webhook**:
   - Create a test user in your deployed app
   - Check Render logs to verify webhook is received
   - Verify user is created in MongoDB

---

## ⚠️ **Important Notes**

### **Webhook Configuration**
- **DON'T** keep both localhost and production webhooks
- **REPLACE** the localhost webhook with the Render URL
- Localhost webhooks won't work in production (not accessible from internet)

### **CORS Configuration**
Your backend already has CORS configured for multiple origins:
```javascript
// Already configured in server.js
app.use(cors({
  origin: [
    'http://localhost:5173',  // Development
    'https://your-app.vercel.app'  // Add your Vercel URL here
  ]
}));
```

### **API Communication Flow**
```
Vercel Frontend → Render Backend → MongoDB Atlas
     ↓
1. User signs up via Clerk
2. Clerk sends webhook to Render
3. Render saves user to MongoDB
4. Frontend reads data from Render API
```

---

## 🧪 **Testing Deployment**

### **1. Test Backend API**
```bash
# Test health endpoint
curl https://your-render-app.onrender.com/api/test

# Test user creation
curl -X POST https://your-render-app.onrender.com/api/users/create \
  -H "Content-Type: application/json" \
  -d '{"clerkId":"test","email":"test@example.com","name":"Test User"}'
```

### **2. Test Frontend**
1. Visit your Vercel URL
2. Sign up with Clerk
3. Check browser console for API calls
4. Verify user data is saved in MongoDB

### **3. Test Webhook**
1. Sign up a new user
2. Check Render logs for webhook events
3. Verify user appears in MongoDB
4. Check if progress tracking works

---

## 🚨 **Troubleshooting**

### **Common Issues**

1. **CORS Errors**:
   ```bash
   # Add your Vercel URL to CORS origins in server.js
   origin: ['http://localhost:5173', 'https://your-vercel-app.vercel.app']
   ```

2. **Environment Variables Not Loading**:
   - Ensure variables start with `VITE_` for frontend
   - Redeploy after adding environment variables
   - Check Vercel/Render dashboards for variable values

3. **Webhook Not Working**:
   - Verify webhook URL is the Render URL (not localhost)
   - Check Render logs for incoming webhook requests
   - Ensure webhook events are subscribed in Clerk

4. **API Base URL Issues**:
   ```javascript
   // Check browser console for current API URL:
   console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
   ```

---

## 📝 **Final Checklist**

- [ ] Backend deployed to Render with environment variables
- [ ] Frontend deployed to Vercel with environment variables
- [ ] Webhook URL updated from localhost to Render URL
- [ ] CORS configured for Vercel domain
- [ ] MongoDB Atlas accessible from Render
- [ ] Test user signup and data persistence
- [ ] Verify API communication between frontend and backend

---

## 🎉 **Success!**

Your ProductDecoded platform is now live:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-render-app.onrender.com`
- **Database**: MongoDB Atlas
- **Auth**: Clerk webhooks working

Users can now access your professional PM learning platform from anywhere! 🚀 