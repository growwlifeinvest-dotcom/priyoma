# 🎯 Complete Priyoma Setup - Step by Step

## ✅ ALL SETUP COMPLETED!

Your Priyoma e-commerce website is now fully configured. Here's everything that's been set up:

---

## 📦 What's Included

### ✅ Frontend
- ✅ Next.js 14 with App Router
- ✅ React + TypeScript
- ✅ Tailwind CSS for styling
- ✅ Lucide React icons
- ✅ Responsive design (mobile-friendly)

### ✅ Backend
- ✅ Next.js API Routes
- ✅ Prisma ORM
- ✅ NextAuth.js for authentication
- ✅ PostgreSQL database support

### ✅ Features
- ✅ User authentication (signup/login)
- ✅ Product management
- ✅ Shopping cart
- ✅ Order management
- ✅ Admin dashboard
- ✅ Category management
- ✅ Product filtering & search

---

## 🚀 Getting Started (5 Minutes)

### Step 1: Start PostgreSQL

**Mac/Linux:**
```bash
# If using Homebrew
brew services start postgresql

# Or directly
postgres -D /usr/local/var/postgres
```

**Windows:**
- Open PostgreSQL installer and start the service
- Or use pgAdmin GUI

**Docker (Easiest):**
```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE priyoma_db;

# List databases
\l

# Exit
\q
```

### Step 3: Configure Environment

Update `.env.local`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/priyoma_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-string-min-32-characters-change-in-production"
```

### Step 4: Setup Database

```bash
cd /home/priya-ghewade/Desktop/Priyoma

# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed disposable development data (destructive; development only)
npm run seed:dev
```

### Step 5: Start Development Server

```bash
npm run dev
```

Open: **http://localhost:3000** 🎉

---

## 🧪 Testing Everything

The development seed includes public sample passwords. Use them only with disposable local data; never reuse them in production.

### Test the Flow

1. **Home Page** - http://localhost:3000
   - See hero section
   - View categories
   - Click on features

2. **Products** - http://localhost:3000/products
   - Browse all products
   - Filter by category
   - Search products

3. **Signup** - http://localhost:3000/auth/signup
   - Create new account
   - Enter details
   - Click Sign Up

4. **Login** - http://localhost:3000/auth/login
   - Login with your account
   - You should see your name in header

5. **Shopping** - http://localhost:3000/products
   - Add products to cart
   - Go to cart (http://localhost:3000/cart)
   - View items

6. **Checkout** - http://localhost:3000/checkout
   - Enter shipping address
   - Place order
   - Get order confirmation

7. **Orders** - http://localhost:3000/orders
   - View your orders
   - Click to see details

8. **Admin** - http://localhost:3000/admin (If admin)
   - View dashboard
   - Manage products
   - Manage orders
   - Manage categories

---

## 📁 Project Structure

```
Priyoma/
├── app/
│   ├── api/
│   │   ├── auth/             # Authentication endpoints
│   │   ├── products/         # Product endpoints
│   │   ├── categories/       # Category endpoints
│   │   ├── cart/             # Cart endpoints
│   │   └── orders/           # Order endpoints
│   ├── auth/                 # Auth pages (login/signup)
│   ├── products/             # Product pages
│   ├── cart/                 # Cart page
│   ├── checkout/             # Checkout page
│   ├── orders/               # Orders page
│   ├── admin/                # Admin pages
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Footer
│   ├── ProductCard.tsx       # Product card component
│   └── SessionProvider.tsx   # Auth session wrapper
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   └── prisma.ts             # Prisma client
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seed
├── .env.local                # Environment variables
├── tsconfig.json             # TypeScript config
├── next.config.js            # Next.js config
├── package.json              # Dependencies
├── README.md                 # Full documentation
├── QUICKSTART.md             # Quick start guide
└── SETUP.md                  # This file
```

---

## 📊 Database Schema

```
User
  ├── id
  ├── name
  ├── email (unique)
  ├── password (hashed)
  ├── phone
  ├── role (USER/ADMIN)
  ├── orders → Order[]
  ├── cart → Cart
  ├── addresses → Address[]
  └── timestamps

Category
  ├── id
  ├── name (unique)
  ├── description
  ├── products → Product[]
  └── timestamps

Product
  ├── id
  ├── name
  ├── description
  ├── price
  ├── imageUrl
  ├── stock
  ├── categoryId → Category
  ├── cartItems → CartItem[]
  ├── orderItems → OrderItem[]
  └── timestamps

Cart
  ├── id
  ├── userId → User
  ├── items → CartItem[]
  └── timestamps

CartItem
  ├── id
  ├── cartId → Cart
  ├── productId → Product
  ├── quantity
  └── timestamps

Order
  ├── id
  ├── userId → User
  ├── items → OrderItem[]
  ├── totalAmount
  ├── status (PENDING/CONFIRMED/PACKED/SHIPPED/DELIVERED/CANCELLED)
  ├── paymentStatus (PENDING/COMPLETED/FAILED/REFUNDED)
  ├── shippingAddress
  └── timestamps

OrderItem
  ├── id
  ├── orderId → Order
  ├── productId → Product
  ├── quantity
  ├── price
  └── timestamps

Address
  ├── id
  ├── userId → User
  ├── name
  ├── phone
  ├── addressLine
  ├── city
  ├── state
  ├── pincode
  ├── isDefault
  └── timestamps
```

---

## 🔐 Admin Setup

### Make Yourself an Admin

**Option 1: Using Prisma Studio (Easiest)**
```bash
npm run prisma:studio
```

Then in the browser UI:
1. Open "User" table
2. Find your user by email
3. Change `role` from `USER` to `ADMIN`
4. Click save
5. Go to http://localhost:3000/admin

**Option 2: Direct SQL**
```bash
psql -U postgres -d priyoma_db
```

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

---

## 🎯 API Endpoints Quick Reference

### Auth
- `POST /api/auth/signin` - Login
- `POST /api/auth/signup` - Register
- `POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Get session

### Products
- `GET /api/products` - List all
- `GET /api/products?categoryId=x` - Filter by category
- `GET /api/products?search=x` - Search
- `GET /api/products/[id]` - Get one
- `POST /api/products` - Create (Admin)
- `PUT /api/products/[id]` - Update (Admin)
- `DELETE /api/products/[id]` - Delete (Admin)

### Categories
- `GET /api/categories` - List all
- `POST /api/categories` - Create (Admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add item
- `PUT /api/cart/[id]` - Update quantity
- `DELETE /api/cart/[id]` - Remove item

### Orders
- `GET /api/orders` - List user's orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update status (Admin)

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm start                      # Start production server
npm run lint                   # Check code quality

# Database
npm run prisma:migrate        # Create migration
npm run prisma:generate       # Generate Prisma Client
npm run prisma:studio         # Open database GUI
npm run seed:dev              # Destructive disposable development data only

# Troubleshooting
npm run seed:dev              # Reset and seed disposable development data
```

---

## 🐛 Common Issues & Fixes

### ❌ Database connection failed
```
Error: P1000 - Authentication failed
```
**Solution:**
- Check `DATABASE_URL` format
- Ensure PostgreSQL is running
- Verify username/password

### ❌ NextAuth not working
```
Error: NEXTAUTH_SECRET is not set
```
**Solution:**
```env
NEXTAUTH_SECRET="your-random-string-min-32-chars"
```

### ❌ Port 3000 already in use
**Solution:**
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process
lsof -i :3000
kill -9 <PID>
```

### ❌ Build fails
**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

---

## 📈 Next Steps (Optional)

1. **Customize Design**
   - Change colors in `app/globals.css`
   - Update fonts
   - Modify components

2. **Add Payment**
   ```bash
   npm install razorpay
   # Add Razorpay integration in checkout
   ```

3. **Add Notifications**
   ```bash
   npm install twilio
   # Send SMS/WhatsApp on order
   ```

4. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Setup database on Railway/Supabase

5. **Custom Domain**
   - Buy domain (priyoma.com)
   - Connect to Vercel

---

## 📚 Documentation Files

- **README.md** - Complete documentation
- **QUICKSTART.md** - Quick start guide
- **SETUP.md** - This setup guide

---

## ✨ Features Implemented

✅ User Authentication
✅ Product Management
✅ Shopping Cart
✅ Checkout Process
✅ Order Tracking
✅ Admin Dashboard
✅ Category Management
✅ Search & Filter
✅ Responsive Design
✅ Dark Mode Support
✅ Mobile Optimized

---

## 🎉 You're All Set!

Your Priyoma e-commerce website is ready to use!

**Start the server:**
```bash
cd /home/priya-ghewade/Desktop/Priyoma
npm run dev
```

**Visit:** http://localhost:3000

---

## 📞 Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **NextAuth.js**: https://next-auth.js.org

---

**Happy coding! 🚀🕯️**
