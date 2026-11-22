# 🚀 Quick Start Guide - Priyoma

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd /home/priya-ghewade/Desktop/Priyoma
npm install
```

### Step 2: Setup Database
```bash
# Make sure PostgreSQL is running
# Create database in PostgreSQL:
# psql -U postgres
# CREATE DATABASE priyoma_db;

# Update .env.local with DATABASE_URL:
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/priyoma_db"

# Run migration
npm run prisma:migrate
```

### Step 3: Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🧪 Testing the Application

### 1. Test User Signup
- Go to http://localhost:3000/auth/signup
- Fill in: Name, Email, Password, Phone
- Click Sign Up

### 2. Test User Login
- Go to http://localhost:3000/auth/login
- Use your signup credentials
- Click Login

### 3. Add Test Products (Admin)
**First, make yourself an admin:**
```bash
npm run prisma:studio
# In Prisma Studio:
# 1. Go to User table
# 2. Find your user
# 3. Change role from USER to ADMIN
# 4. Save
```

Then:
- Go to http://localhost:3000/admin
- Add a Category first
- Then add Products
- Set price and stock

### 4. Test Shopping Flow
1. Go to http://localhost:3000/products
2. Browse products
3. Click "Add to Cart"
4. Go to http://localhost:3000/cart
5. Click "Proceed to Checkout"
6. Fill shipping address
7. Click "Place Order"

### 5. Test Order Tracking
- Go to http://localhost:3000/orders
- View your orders
- Click on an order to see details

---

## 📊 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Build
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Run ESLint

# Database
npm run prisma:migrate   # Create/run migrations
npm run prisma:generate  # Generate Prisma Client
npm run prisma:studio    # Open Prisma Studio GUI

# Database
npm run prisma:seed      # Seed database (if seed.ts exists)
```

---

## 🔑 Default Admin Setup

After signup, to make yourself an admin:

```bash
npm run prisma:studio
```

Then:
1. Go to "User" table
2. Find your email
3. Click the user
4. Change `role` from `USER` to `ADMIN`
5. Click Save

Or use SQL directly:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

---

## 📱 Pages to Visit

**User Pages:**
- Home: http://localhost:3000
- Products: http://localhost:3000/products
- Product Detail: http://localhost:3000/products/[id]
- Cart: http://localhost:3000/cart
- Checkout: http://localhost:3000/checkout
- Orders: http://localhost:3000/orders
- Order Detail: http://localhost:3000/orders/[id]
- Login: http://localhost:3000/auth/login
- Signup: http://localhost:3000/auth/signup

**Admin Pages:**
- Admin Dashboard: http://localhost:3000/admin
- Manage Products: http://localhost:3000/admin/products
- Manage Orders: http://localhost:3000/admin/orders
- Manage Categories: http://localhost:3000/admin/categories

---

## 🎨 Add Sample Data

### Via Prisma Studio:

```bash
npm run prisma:studio
```

1. **Create Categories:**
   - Name: "Scented Candles"
   - Name: "Luxury Candles"
   - Name: "Gift Sets"

2. **Create Products:**
   - Name: "Lavender Bliss"
   - Price: 499
   - Stock: 50
   - Category: Select one

3. **Create Users:**
   - Just signup via the UI!

---

## 🐛 Troubleshooting

### Issue: `error: database "priyoma_db" does not exist`
**Solution:**
```bash
# Create database
psql -U postgres
CREATE DATABASE priyoma_db;
\q

# Then run migration
npm run prisma:migrate
```

### Issue: `NextAuth.js not configured`
**Solution:** Check `.env.local` has:
```env
NEXTAUTH_SECRET=your-random-32-char-string
NEXTAUTH_URL=http://localhost:3000
```

### Issue: Port 3000 already in use
**Solution:**
```bash
npm run dev -- -p 3001
# Or kill the process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Issue: Products not showing
**Solution:**
1. Check products exist in database
2. Check category is linked
3. Check stock > 0

---

## 🌟 Next Steps

After setup, you can:

1. **Customize Colors**: Edit `app/globals.css`
2. **Add Payment**: Integrate Razorpay
3. **Add Notifications**: Setup Twilio/WhatsApp API
4. **Deploy**: Push to Vercel
5. **Domain**: Connect custom domain

---

## 📞 Need Help?

Check README.md for detailed documentation!

---

**Start developing! 🚀**
