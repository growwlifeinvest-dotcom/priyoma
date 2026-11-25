# 🕯️ Priyoma - Luxury Candle E-Commerce Platform

A modern, full-stack e-commerce website for the premium candle brand "Priyoma" built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [User Guide](#user-guide)
- [Admin Guide](#admin-guide)
- [Deployment](#deployment)

## ✨ Features

### User Features
- 🔐 User authentication (signup/login)
- 🛍️ Browse and search products
- 🏷️ Filter by categories
- 📄 Product details and specifications
- 🛒 Shopping cart management
- 💳 Checkout process
- 📦 Order tracking
- 📋 Order history
- 🔑 User profile management

### Admin Features
- 📊 Dashboard with analytics
- ➕ Add/Edit/Delete products
- 🏷️ Manage product categories
- 📦 View and manage orders
- 🔄 Update order status
- 📈 Monitor sales

### General Features
- ✅ 100% responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔍 Search and filter functionality
- 🌐 Fast and optimized performance
- 🛡️ Secure authentication
- 📱 Mobile-friendly

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Next.js API Routes** - Serverless backend
- **Prisma** - ORM
- **PostgreSQL** - Database
- **NextAuth.js** - Authentication
- **bcrypt** - Password hashing

### Deployment
- **Vercel** - Frontend hosting
- **Railway/Supabase** - Database hosting

## 📁 Project Structure

```
priyoma/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   └── signup/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── cart/
│   │   └── orders/
│   ├── products/
│   ├── product/[id]/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── admin/
│   │   ├── products/
│   │   ├── orders/
│   │   └── categories/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── SessionProvider.tsx
├── lib/
│   ├── auth.ts
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
├── public/
├── .env.local
├── tsconfig.json
├── next.config.js
└── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ (v20.14.0+)
- npm or yarn
- PostgreSQL database
- Git

### Step 1: Clone or Setup Project
```bash
cd /home/priya-ghewade/Desktop/Priyoma
npm install
```

### Step 2: Configure Environment Variables
Create `.env.local` file with:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/priyoma_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars-change-in-prod"
```

### Step 3: Setup Database
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

### Step 4: Create Initial Admin User
```bash
# Run this from Prisma Studio or use the signup API
# Then manually update the role in database:
# UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

### Step 5: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🔐 Environment Variables

```env
# Database Connection
DATABASE_URL=postgresql://user:password@localhost:5432/priyoma_db

# Authentication
NEXTAUTH_URL=http://localhost:3000  # Change to your domain in production
NEXTAUTH_SECRET=generate_a_random_string_min_32_chars

# Optional: Payment Integration
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Optional: Email Service
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Optional: SMS/WhatsApp
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

## 📊 Database Setup

### PostgreSQL Connection

1. **Install PostgreSQL** (if not already installed)
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib

   # macOS
   brew install postgresql

   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database**
   ```bash
   psql -U postgres
   CREATE DATABASE priyoma_db;
   \q
   ```

3. **Update .env.local**
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/priyoma_db"
   ```

4. **Run Migrations**
   ```bash
   npm run prisma:migrate
   ```

### Test Data Setup

Add sample data via API or Prisma Studio:

**Category Examples:**
- Scented Candles
- Luxury Candles
- Gift Sets
- Eco-Friendly

**Product Examples:**
- Lavender Bliss Candle - ₹499
- Rose Garden Premium - ₹699
- Winter Spice Collection - ₹599

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/signup          - Create new user account
POST   /api/auth/signin          - Login user
GET    /api/auth/session         - Get current session
```

### Products
```
GET    /api/products             - Get all products (with filters)
GET    /api/products/[id]        - Get single product
POST   /api/products             - Create product (Admin only)
PUT    /api/products/[id]        - Update product (Admin only)
DELETE /api/products/[id]        - Delete product (Admin only)
```

### Categories
```
GET    /api/categories           - Get all categories
POST   /api/categories           - Create category (Admin only)
```

### Cart
```
GET    /api/cart                 - Get user's cart
POST   /api/cart/add             - Add item to cart
PUT    /api/cart/[id]            - Update cart item
DELETE /api/cart/[id]            - Remove cart item
```

### Orders
```
GET    /api/orders               - Get user's orders
POST   /api/orders               - Create new order
GET    /api/orders/[id]          - Get order details
PUT    /api/orders/[id]          - Update order status (Admin only)
```

## 👥 User Guide

### 1. Creating an Account
1. Click "Sign Up" on the header
2. Enter name, email, password, and phone
3. Click "Sign Up" button
4. You'll be redirected to login page
5. Login with your credentials

### 2. Shopping
1. Browse products on home page or products page
2. Use search and category filters
3. Click "View" or "Add to Cart"
4. View product details
5. Select quantity and add to cart
6. Go to cart to review items

### 3. Checkout
1. Go to shopping cart
2. Click "Proceed to Checkout"
3. Fill in shipping address
4. Review order summary
5. Click "Place Order"
6. Your order is confirmed!

### 4. Tracking Orders
1. Go to "My Orders" page
2. View all your orders with status
3. Click on any order to see details
4. Track the order status:
   - PENDING → CONFIRMED → PACKED → SHIPPED → DELIVERED

## 🔐 Admin Guide

### Admin Login
1. Admin account must be created and role set to "ADMIN"
2. Login with admin credentials
3. You'll see admin-only sections in the header

### Managing Products
1. Go to Admin → Products
2. Click "Add Product"
3. Fill in product details:
   - Name
   - Category
   - Description
   - Price
   - Stock
   - Image URL
4. Click "Add Product"
5. Manage existing products (edit/delete)

### Managing Categories
1. Go to Admin → Categories
2. Click "Add Category"
3. Enter category name and description
4. Click "Add Category"

### Managing Orders
1. Go to Admin → Orders
2. View all customer orders
3. Update order status using dropdown:
   - PENDING
   - CONFIRMED
   - PACKED
   - SHIPPED
   - DELIVERED
   - CANCELLED
4. Changes are saved automatically

### Dashboard
- View key metrics:
  - Total Orders
  - Total Products
  - Total Users
  - Revenue

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/priyoma.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `DATABASE_URL`
     - `NEXTAUTH_URL`
     - `NEXTAUTH_SECRET`
   - Use a newly generated `NEXTAUTH_SECRET` for Production (for example, generate one locally with `openssl rand -base64 32`).
   - Configure `NEXTAUTH_URL` to the production domain.

3. **Apply the database migration before serving production traffic**
   - Use a new, empty PostgreSQL database for production.
   - Set its `DATABASE_URL` in the environment where you run the migration, then run `npx prisma migrate deploy`.
   - Do not use `prisma migrate dev`, `prisma db push`, or the destructive development seed against production.

4. **Create the initial production admin**
   - Set `NODE_ENV=production`, `ADMIN_EMAIL`, and a unique `ADMIN_PASSWORD` of at least 16 characters in the trusted environment used for the seed command.
   - Run `npm run seed:prod` once. The script refuses to run without these values or if an admin already exists.
   - The existing development seed is destructive and contains public sample passwords. Never use those credentials in production.

5. **Deploy**
   - The build runs `prisma generate` before `next build`.
   - Deploy only after confirming the production environment variables and migration are in place.


### Database Hosting

**Option 1: Railway**
1. Go to https://railway.app
2. Create new project
3. Add PostgreSQL service
4. Get connection string
5. Update `DATABASE_URL`

**Option 2: Supabase**
1. Go to https://supabase.com
2. Create new project
3. Get PostgreSQL connection string
4. Update `DATABASE_URL`

## 📝 Development Tips

### Add Test Data
```bash
npm run prisma:studio

# In Prisma Studio:
# 1. Add Categories
# 2. Add Products
# 3. Add Users (signup via UI)
```

### Debug Issues
```bash
# Check database connection
npm run prisma:studio

# View logs
npm run dev -- --debug

# Check environment variables
cat .env.local
```

### Common Issues & Solutions

**Issue:** "Database connection failed"
- **Solution:** Check `DATABASE_URL` in `.env.local`

**Issue:** "NextAuth error"
- **Solution:** Ensure `NEXTAUTH_SECRET` is set (min 32 chars)

**Issue:** "Product not showing"
- **Solution:** Verify product has stock > 0

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is proprietary software for Priyoma. All rights reserved.

## 📞 Support

For issues and support:
- Email: hello@priyoma.com
- WhatsApp: +91 9876543210
- Instagram: @priyoma.candles

---

**Happy Candling! 🕯️✨**



Test Credentials:


Seeded sample accounts are development-only and use public passwords; never reuse them.
What's Working:
✅ Homepage loads
✅ Products API returns data
✅ Categories working
✅ Authentication ready
✅ All pages compile
✅ Database queries working

🚀 Try These Now:
Homepage → http://localhost:3002
Products Page → http://localhost:3002/products
Login → http://localhost:3002/auth/login
Signup → http://localhost:3002/auth/signup
Admin Dashboard → http://localhost:3002/admin