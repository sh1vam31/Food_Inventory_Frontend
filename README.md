# 🍕 Food Order & Inventory Management System

A complete, production-ready food inventory management system with automatic raw material deduction, authentication, and admin features.

![System Architecture](https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Database](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite)

## 🌐 Live Demo

**Frontend**: https://food-inventory-frontend-j9yy4cbh2.vercel.app/

## ✨ Features

### 🔐 Authentication & Authorization
- **User Management**: Admin, manager, and staff roles
- **Secure Login**: JWT-based authentication with refresh tokens
- **Protected Routes**: Role-based access control
- **Admin Dashboard**: User management and system overview

### 🏪 Inventory Management
- **Raw Materials**: Track ingredients with units, quantities, and minimum thresholds
- **Low Stock Alerts**: Visual indicators for items below minimum threshold
- **Smart Deletion**: Prevents deletion of materials used in recipes with detailed warnings
- **Edit Capabilities**: Update stock levels and material details

### 🍽️ Menu Management
- **Food Items**: Create menu items with prices and availability
- **Recipe Builder**: Define ingredient requirements for each food item
- **Availability Tracking**: Automatic availability based on ingredient stock
- **Edit Recipes**: Modify existing food items and their recipes

### 📋 Order Processing
- **Smart Ordering**: Real-time inventory checking before order placement
- **Atomic Transactions**: Guaranteed inventory deduction with rollback protection
- **Order Tracking**: Complete order lifecycle management (Placed → Completed/Cancelled)
- **Order Details**: View detailed information for each order

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Dark/Light Theme**: Automatic theme switching with system preference
- **Real-time Updates**: Live inventory status and availability checking
- **Mobile Responsive**: Works perfectly on all device sizes

### 🔧 Technical Excellence
- **Type Safety**: Full TypeScript implementation
- **API Documentation**: Auto-generated OpenAPI/Swagger docs
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Production Ready**: Configured for Vercel and Render deployment
- **Database Support**: SQLite for local, PostgreSQL for production

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sh1vam31/Food_Inventory_Frontend.git
   cd Food_Inventory_Frontend
   ```

2. **Setup Backend**
   ```bash
   # Using the provided script (recommended)
   ./run_backend_local.sh
   
   # Or manually:
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
food-inventory-system/
├── frontend/                 # Next.js Frontend
│   ├── app/                 # App Router pages
│   │   ├── admin/           # Admin dashboard
│   │   ├── dashboard/       # Main dashboard
│   │   ├── inventory/       # Raw materials management
│   │   │   └── edit/        # Edit inventory items
│   │   ├── menu/           # Food items management
│   │   │   └── edit/        # Edit menu items
│   │   ├── orders/         # Order management
│   │   │   └── [id]/       # Order details
│   │   ├── login/          # Authentication
│   │   └── home/           # Landing page
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React contexts (Auth, Theme)
│   ├── lib/              # Utilities and API client
│   └── types/            # TypeScript type definitions
│
├── backend/                # FastAPI Backend
│   ├── app/
│   │   ├── models/        # SQLAlchemy database models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic layer
│   │   ├── routers/       # API route handlers
│   │   │   └── auth.py   # Authentication endpoints
│   │   └── core/          # Core configurations & auth
│   ├── alembic/          # Database migrations
│   └── seed_data.py      # Sample data generator
│
└── scripts/              # Utility scripts
    ├── run_backend_local.sh
    └── test_local_config.sh
```

## 🏗️ Architecture

### Backend (FastAPI)
- **Models**: SQLAlchemy ORM with proper relationships
- **Services**: Business logic with atomic transactions
- **Routers**: RESTful API endpoints with validation
- **Authentication**: JWT tokens with bcrypt password hashing
- **Database**: SQLite for development, PostgreSQL for production

### Frontend (Next.js)
- **App Router**: Modern Next.js 14 routing
- **Components**: Reusable UI components with Tailwind CSS
- **State Management**: React Context API for Auth and Theme
- **API Integration**: Axios client with proper error handling
- **Protected Routes**: Client-side route protection

## 🔄 Core Business Logic

### Inventory Deduction Algorithm
```python
# Atomic transaction ensures data consistency
def create_order(db: Session, order_data: OrderCreate):
    with db.begin():
        # 1. Validate inventory availability
        # 2. Create order record
        # 3. Deduct raw materials atomically
        # 4. Rollback on any failure
```

### Smart Availability Checking
- Real-time calculation of food item availability based on ingredient stock
- Prevents orders that cannot be fulfilled
- Shows detailed shortage information to users

## 🚀 Deployment

### Production Deployment (Recommended)

**Backend → Render**
- Automatic deployments from Git
- PostgreSQL database support
- Environment variable management
- Built-in SSL and custom domains

**Frontend → Vercel**
- Optimized for Next.js
- Global CDN and edge functions
- Automatic preview deployments
- Environment variable support

See [DEPLOYMENT.md](DEPLOYMENT.md) and [POSTGRESQL_DEPLOYMENT.md](POSTGRESQL_DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables

**Backend (.env)**
```env
# Local Development
DATABASE_URL=sqlite:///./food_inventory.db
ENVIRONMENT=development
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

**Frontend (.env.local)**
```env
# Local Development
NEXT_PUBLIC_FOOD_API_URL=http://localhost:8000

# Production
NEXT_PUBLIC_FOOD_API_URL=https://your-backend.onrender.com
```

## 📊 Sample Data

The system includes comprehensive seed scripts:
- 10 raw materials (flour, sugar, eggs, etc.)
- 4 food items with complete recipes
- Sample admin and staff users
- Realistic inventory levels and pricing

Run `python seed_data.py` to populate the database.

## 🧪 API Documentation

Interactive API documentation is available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints
- `POST /api/auth/login` - User authentication
- `GET /api/raw-materials/` - List all raw materials
- `POST /api/orders/` - Create new order with inventory deduction
- `GET /api/food-items/` - List available menu items
- `POST /api/orders/check-inventory` - Validate order before placement

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation files (DEPLOYMENT.md, POSTGRESQL_DEPLOYMENT.md)
- Review API documentation at `/docs` endpoint

---

**Built with ❤️ for efficient food service management**
